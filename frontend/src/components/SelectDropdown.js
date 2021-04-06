import React from 'react'

const SelectDropdown = ({title, onChange, options}) => {
    return (
      <div className="input-group w-25">
        <label className="input-group-text" for="inputGroupSelect01">
          {title}
        </label>
        <select onChange={onChange} className="form-select" id="inputGroupSelect01">
          <option selected>Choose...</option>
          {options?.map((i) => (
            <option value={i}>{i}</option>
          ))}
        </select>
      </div>
    );
}

export default SelectDropdown
