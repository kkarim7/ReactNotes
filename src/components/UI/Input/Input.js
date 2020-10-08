import React from "react";

import classes from "./Input.module.css";

const input = (props) => {
  let inputElement = null;

  let inputClasses = [classes.Input];

  inputElement = (
    <input
      className={inputClasses}
      type="text"
      value={props.value}
      placeholder={props.placeholder}
      onChange={props.changed}
    />
  );

  return (
    <div>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default input;
