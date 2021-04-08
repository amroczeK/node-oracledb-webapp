import React, { useState } from "react";
import SelectDropdown from "./SelectDropdown";

const Binds = ({ title, index }) => {
  const [queryBinds, setQueryBinds] = useState([]);
  const bindsDropdown = [1, 2, 3, 4, 5];

  const queryBindsHandler = (e) => {
    let count = e.target.value;
    let binds = [];
    for (let i = 0; i < count; i++) {
      binds.push(i);
    }
    setQueryBinds(binds);
  };

  return (
    <>
      <SelectDropdown id={`bind-count-${index}`} title={title} onChange={queryBindsHandler} options={bindsDropdown} defaultValue={"No Binds"} />
      {queryBinds?.map((i) => (
        <div key={i} className="input-group mt-3 mb-3">
          <span className="input-group-text">Bind</span>
          <input id={`bind-${index}`} type="text" className="form-control" placeholder="id" aria-label="Bind" />
          <span className="input-group-text">Value</span>
          <input id={`bind-value-${index}`} type="text" className="form-control" placeholder="1234" aria-label="Value" />
          <label className="input-group-text" htmlFor="inputGroupSelect01">
            Type
          </label>
          <select id={`bind-type-${index}`} className="form-select">
            <option defaultValue={"Choose..."}>Choose...</option>
            <option value="STRING">String</option>
            <option value="NUMBER">Number</option>
          </select>
        </div>
      ))}
    </>
  );
};

export default Binds;
