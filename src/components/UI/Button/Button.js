import React from "react";

import Aux from "../../../hoc/Aux";
import classes from "./Button.module.css";

const button = (props) => {

  let attachedClass = classes.CircleButton;

  if (props.submitNewNote) {
    attachedClass = classes.AddNote;
  }

  return (
    <Aux>
      <button className={attachedClass} onClick={props.clicked}>
        {props.children}
      </button>
    </Aux>
  );
};

export default button;
