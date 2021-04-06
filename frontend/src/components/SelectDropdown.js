import React from 'react'

const SelectDropdown = ({id, title, onChange, options}) => {
    return (
      <div className="input-group w-25">
        <label className="input-group-text" for="inputGroupSelect01">
          {title}
        </label>
        <select onChange={onChange} className="form-select" id={id}>
          <option defaultValue={"Choose..."}>Choose...</option>
          {options?.map((i) => (
            <option key={i} value={i}>{i}</option>
          ))}
        </select>
      </div>
    );
}

export default SelectDropdown
