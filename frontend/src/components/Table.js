import React from "react";

const Table = ({ data = {} }) => {
  let columns = data?.columns;
  let rows = data?.rows;
  return (
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
            {row?.map((r) => (
              <td>{r}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
