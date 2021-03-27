import axios from "axios";

export const queryOracleDb = async ({ body, id }) => {
  try {
    const { data } = await axios.post(`/api/query`, body);
    data["id"] = id;
    return data;
  } catch (error) {
    console.log(error.toString());
    return {};
  }
};
