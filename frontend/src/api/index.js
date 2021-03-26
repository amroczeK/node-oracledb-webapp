import axios from "axios";

export const queryOracleDb = async ({ body }) => {
  try {
    const { data } = await axios.post(`/api/query`, body);
    return data;
  } catch (error) {
    console.log(error.toString());
    return {};
  }
};
