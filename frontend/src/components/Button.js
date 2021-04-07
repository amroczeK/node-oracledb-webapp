import React from "react";
import "./styles/Button.css";

const Button = ({ title, onClick }) => {
  return (
    <button type="button" className="btn btn-primary mr-1" onClick={onClick}>
      {title}
    </button>
  );
};

export default Button;
