import React from "react";
import './style.css';

const Button = ({title, handleClick}) => {
  return(
    <div role="button" className="btn" onClick={handleClick}>{title}</div>
  )
}

export default Button;