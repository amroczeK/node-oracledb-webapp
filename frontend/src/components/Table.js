import React, { useEffect, useState } from "react";
import "./Table.css"

const Table = ({ data = {} }) => {
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);

  const getColumns = (metaData) => {
    let arr = [];
    metaData.forEach((e) => arr.push(e.name));
    return arr;
  };

  const getRows = (rows) => {
    console.log(rows);
    let arr = [];
    rows.forEach((row) => {
      let arr2 = Object.values(row);
      arr2.forEach((e) => arr.push(e));
    });
    return arr;
  };

  useEffect(() => {
    if (data?.length > 0) {
      setColumns(getColumns(data[0].metaData));
      setRows(getRows(data[0].rows));
    }
  }, [data]);

  return (
    <div class="table-wrapper-scroll-y my-custom-scrollbar">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            {columns?.map((column) => (
              <th scope="col">{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows?.map((row, idx) => (
            <tr>
              <th scope="row">{idx}</th>
              <td>{row}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
