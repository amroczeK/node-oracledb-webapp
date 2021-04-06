import axios from "axios";
import { queue } from "async-es";

export const queryOracleDb = async ({ sql, id }) => {
  try {
    const { data } = await axios.post(`/api/query`, { sql });
    data["id"] = id;
    return data;
  } catch (error) {
    console.log(error.toString());
    return {};
  }
};

export const fetchData = ({ queries, concurrency }) => {
  return new Promise(async (resolve, reject) => {
    let results = [];
    const q = queue(
      async ({ sql, id }) => {
        let response = await queryOracleDb({ sql, id });
        console.log("resp[onse", response);
        results.push(response);
      },
      concurrency ? concurrency : 1
    );

    queries.forEach(({ sql, id }) =>
      q.push({ sql, id }, (err) => {
        if (err) console.log(err);
        console.log("finished processing item");
      })
    );

    await q.drain();
    console.log("all items have been processed");
    resolve(results);
  });
};
