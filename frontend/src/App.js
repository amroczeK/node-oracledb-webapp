import React, { useState } from "react";
import { fetchData } from "./api";
import SelectDropdown from "./components/SelectDropdown";
import Checkbox from "./components/Checkbox";
import Table from "./components/Table";

const App = () => {
  const [queryCount, setQueryCount] = useState([]);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [checked, setChecked] = useState(false);
  const [concurrency, setConcurrency] = useState(null);
  const queriesDropdown = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const concurrencyLimit = [1, 2, 3, 4];

  const queryCountHandler = (e) => {
    let selected = e.target.value;
    let arr = [];

    if (!isNaN(selected)) {
      for (let count = 0; count < selected; count++) {
        arr.push(count);
      }
      setQueryCount(arr);
    } else {
      setQueryCount([]);
    }
  };

  const concurrentCheckedHandler = (e) => {
    let checked = e.target.checked;
    setChecked(checked);
  };

  const executeQueries = () => {
    let arr = [];
    queryCount.forEach((i) => {
      let query = document.getElementById(`sql-${i}`).value;
      if (query) {
        arr.push({ sql: query, id: `sql-${i}` });
      }
    });
    setLoading(true);
    fetchData({ queries: arr, concurrency })
      .then((response) => {
        console.log(response);
        setResults(response);
        setLoading(!loading);
      })
      .catch((error) => console.log(error));
    // let promises = [];
    // arr.forEach(({ sql, id }) => {
    //   let body = { sql };
    //   promises.push(queryOracleDb({ body, id }));
    // });
    // Promise.all(promises)
    //   .then((responses) => {
    //     let results = [];
    //     responses.forEach((response) => {
    //       results.push(response);
    //     });
    //     setResults(results);
    //     setLoading(!loading);
    //   })
    //   .catch((error) => console.log(error));
  };

  const resetResults = () => {
    if (results?.length > 0) {
      setResults([]);
    }
  };

  return (
    <div className="container mt-5">
      <div className="d-flex flex-row">
        <SelectDropdown title={"Number of Queries"} onChange={queryCountHandler} options={queriesDropdown} />
      </div>
      <Checkbox title={"Concurrent Queries"} onChange={concurrentCheckedHandler} />
      {/* <div className="form-check mt-3">
        <input onChange={onCheckedHandler} type="checkbox" className="form-check-input" id="exampleCheck1" />
        <label className="form-check-label" for="exampleCheck1">
          Concurrent Queries
        </label>
      </div> */}
      {checked && (
        <SelectDropdown
          title={"Concurrency Limit"}
          onChange={(e) => {
            setConcurrency(e.target.value);
          }}
          options={concurrencyLimit}
        />
        // <div className="input-group w-25 mt-3">
        //   <label className="input-group-text" for="inputGroupSelect01">
        //     Concurrency Limit
        //   </label>
        //   <select
        //     onChange={(e) => {
        //       setConcurrency(e.target.value);
        //     }}
        //     className="form-select"
        //     id="inputGroupSelect01"
        //   >
        //     <option selected>Choose...</option>
        //     {concurrencyLimit?.map((i) => (
        //       <option value={i}>{i}</option>
        //     ))}
        //   </select>
        // </div>
      )}
      <div className="mb-3 mt-3">
        {queryCount?.map((i) => (
          <div className="form-group mb-4">
            <label for="text-area">SQL Query</label>
            <textarea className="form-control" id={`sql-${i}`} rows="7"></textarea>
            {results.length > 0 && <Table key={`sql-${i}`} data={results[i]} />}
          </div>
        ))}
      </div>
      <div className="d-flex flex-row">
        <button type="button" className="btn btn-primary" onClick={() => executeQueries()}>
          Query
        </button>
        <button type="button" className="btn btn-primary" onClick={resetResults}>
          Clear Results
        </button>
      </div>
    </div>
  );
};

export default App;
