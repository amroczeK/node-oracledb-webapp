import React, { useState } from "react";
import { fetchData } from "./api";
import SelectDropdown from "./components/SelectDropdown";
import Checkbox from "./components/Checkbox";
import Button from "./components/Button";
import Query from "./components/Query";

const App = () => {
  const [queryCount, setQueryCount] = useState([]);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState({});
  const [checked, setChecked] = useState(false);
  const [concurrency, setConcurrency] = useState(null);
  const queriesDropdown = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const concurrencyDropdown = [1, 2, 3, 4];

  const queryCountHandler = (e) => {
    let selected = e.target.value;
    let arr = [];

    resetResults();
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
    let queryBinds = [];
    queryCount.forEach((i) => {
      let bindCountEle = document.getElementById(`bind-count-${i}`);
      let bindCount = bindCountEle.options[bindCountEle.selectedIndex].value;

      let binds = {};
      for (let count = 0; count < bindCount; count++) {
        let bind = document.getElementById(`bind-${i}`).value;
        let val = document.getElementById(`bind-value-${i}`).value;
        let typeEle = document.getElementById(`bind-type-${i}`);
        let type = typeEle.options[typeEle.selectedIndex].value;
        binds[bind] = {
          val,
          type,
        };
        queryBinds.push(binds);
      }

      // Binds example: { NAME: { val: 'Adrian', type: STRING }, ID: { val: '1234', type: NUMBER } }
      let query = document.getElementById(`sql-${i}`).value;
      if (query) {
        arr.push({ sql: query, id: `sql-${i}`, index: i, queryBinds });
      }
    });
    setLoading(true);
    fetchData({ queries: arr, concurrency }).then((response) => {
      setResults(response);
      setLoading(!loading);
    });
  };

  // Remove previous results if there are any
  const resetResults = () => {
    if (Object.keys(results).length > 0) {
      setResults([]);
    }
  };

  return (
    <div className="container mt-5">
      <SelectDropdown title={"Number of Queries"} onChange={queryCountHandler} options={queriesDropdown} />
      <Checkbox title={"Concurrent Queries"} onChange={concurrentCheckedHandler} />
      {checked && (
        <SelectDropdown
          title={"Concurrency Limit"}
          onChange={(e) => {
            setConcurrency(e.target.value);
          }}
          options={concurrencyDropdown}
        />
      )}
      <div className="mb-3 mt-3">
        {queryCount?.map((i) => (
          <Query key={i} index={i} title={`SQL Query #${i + 1}`} results={results} />
        ))}
      </div>
      <div className="d-flex flex-row mb-5">
        <Button title={"Query"} onClick={() => executeQueries()} />
        <Button title={"Clear Results"} onClick={() => resetResults()} />
      </div>
    </div>
  );
};

export default App;
