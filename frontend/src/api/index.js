import axios from "axios";
import { queue } from "async-es";

export const queryOracleDb = async ({ sql, id, index, binds }) => {
  try {
    const { data } = await axios.post(`/api/query`, { sql, binds });
    data["id"] = id;
    data["index"] = index;
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const fetchData = ({ queries, concurrency }) => {
  return new Promise(async (resolve, reject) => {
    let results = {};
    const q = queue(
      async ({ sql, id, index, binds }) => {
        let response = await queryOracleDb({ sql, id, index, binds });
        results[index] = response;
      },
      concurrency ? concurrency : 1
    );

    queries.forEach(({ sql, id, index, queryBinds }) =>
      q.push({ sql, id, index, binds: queryBinds[index] }, (err) => {
        if (err) console.log(err);
        console.log(`finished processing ${id}`);
      })
    );

    await q.drain();
    console.log("all items have been processed");
    resolve(results);
  });
};
