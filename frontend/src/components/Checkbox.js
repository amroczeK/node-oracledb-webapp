import React from 'react'

const Checkbox = ({title, onChange}) => {
    return (
      <div className="form-check mt-3">
        <input onChange={onChange} type="checkbox" className="form-check-input" id="exampleCheck1" />
        <label className="form-check-label" htmlFor="exampleCheck1">
          {title}
        </label>
      </div>
    );
}

export default Checkbox
