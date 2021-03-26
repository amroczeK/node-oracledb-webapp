import axios from "axios";

export const queryOracleDb = async ({ queries }) => {
  try {
    const { data } = await axios.post(`/api/query`, queries);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error.toString());
    return {};
  }
};
