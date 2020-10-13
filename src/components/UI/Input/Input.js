import React from "react";

import classes from "./Input.module.css";

const input = (props) => {
  let inputElement = null;

  let inputClasses = [classes.Input];

  switch (props.inputType) {
    case "paragraph":
      inputElement = (
        <textarea
          className={inputClasses}
          value={props.value}
          placeholder={props.placeholder}
          onChange={props.changed}
          label={props.label}
        />
      );
      break;
    default:
      inputElement = (
        <input
          className={inputClasses}
          type="text"
          value={props.value}
          placeholder={props.placeholder}
          onChange={props.changed}
          label={props.label}
        />
      );
  }

  return (
    <div>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default input;
