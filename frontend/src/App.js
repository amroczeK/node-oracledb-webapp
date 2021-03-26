import React, { useState, useEffect, useCallback } from "react";
import { queryOracleDb } from "./api";
import Table from "./components/Table";

const App = () => {
  const [queries, setQueries] = useState([]);
  const [queryCount, setQueryCount] = useState([]);
  const [loading, setLoading] = useState(false);
  const [runQuery, setRunQuery] = useState(false);
  const [singleResult, setSingleResult] = useState(null);
  const [results, setResults] = useState([]);
  const dropdown = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const onChangeHandler = (e) => {
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

  const onQueryHandler = async (e) => {
    let arr = [];
    queryCount.forEach((i) => {
      arr.push({ sql: document.getElementById(`sql-${i}`).value, id: `sql-${i}` });
    });
    setQueries(arr);
    setRunQuery(true);
    setLoading(true);
  };

  const executeQueries = useCallback(async () => {
    if (runQuery) {
      let response;
      console.log(queries);
      queries.forEach(async ({ sql, id }) => {
        setLoading(true);
        let body = { sql };
        response = await queryOracleDb({ body });
        if (response) {
          setLoading(!loading);
          setRunQuery(!runQuery);
          setSingleResult({ result: response, id });
        }
      });
    }
  }, [runQuery]);

  useEffect(() => {
    if (results?.length > 0) {
      setResults([]);
    }
  }, [queryCount]);

  useEffect(() => {
    executeQueries();
  }, [executeQueries]);

  useEffect(() => {
    if (singleResult) setResults([...results, singleResult]);
  }, [singleResult]);

  return (
    <div className="container mt-5">
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
            {queries?.map((query) => results?.length > 0 && query.id === `sql-${i}` && <Table id={`sql-${i}`} key={`sql-${i}`} data={results} />)}
          </div>
        ))}
      </div>
      <button type="button" class="btn btn-primary" onClick={onQueryHandler}>
        Query
      </button>
    </div>
  );
};

export default App;
