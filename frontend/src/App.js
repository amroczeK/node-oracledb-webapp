import React, { useState } from "react";
import { queryOracleDb } from "./api";

const App = () => {
  const [queries, setQueries] = useState([]);
  const [queryCount, setQueryCount] = useState([]);
  const dropdown = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const onChangeHandler = (e) => {
    let selected = e.target.value;
    let arr = [];
    if (!isNaN(selected)) {
      for (let count = 0; count < selected; count++) {
        arr.push(count);
      }
      setQueryCount(arr);
    }
  };

  const onQueryHandler = async (e) => {
    let arr = [];
    queryCount.forEach((i) => {
      arr.push(document.getElementById(`sql-${i}`).value);
    });
    setQueries(arr);
    try {
      let results = await queryOracleDb({ queries: "test" });
      console.log(results);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-5">
      <form>
        <div class="input-group mb-3">
          <label class="input-group-text" for="inputGroupSelect01">
            Number of queries
          </label>
          <select onChange={onChangeHandler} class="form-select" id="inputGroupSelect01">
            <option selected>Choose...</option>
            {dropdown?.map((i) => (
              <option value={i}>{i}</option>
            ))}
          </select>
        </div>
        <div class="mb-3">
          {queryCount?.map((i) => (
            <div class="form-group mb-4">
              <label for="text-area">SQL Query</label>
              <textarea class="form-control" id={`sql-${i}`} rows="7"></textarea>
            </div>
          ))}
        </div>
        <button type="button" class="btn btn-primary" onClick={onQueryHandler}>
          Query
        </button>
      </form>
    </div>
  );
};

export default App;
