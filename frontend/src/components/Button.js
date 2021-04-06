import React from 'react'

const Button = ({title, onClick}) => {
    return (
      <>
        <button type="button" className="btn btn-primary" onClick={onClick}>
          {title}
        </button>
      </>
    );
}

export default Button
