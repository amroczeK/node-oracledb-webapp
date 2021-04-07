import React from "react";
import Binds from "./Binds";
import Table from "./Table";

const Query = ({ index, title, results }) => {
  return (
    <div className="form-group mb-4">
      <label htmlFor="text-area">{title}</label>
      <textarea className="form-control mb-3" id={`sql-${index}`} rows="7"></textarea>
      <Binds id={`sql-${index}-binds`} title={"Number of Binds"} index={index} />
      {results[index] && <Table key={`sql-${index}`} data={results[index]} />}
    </div>
  );
};

export default Query;
