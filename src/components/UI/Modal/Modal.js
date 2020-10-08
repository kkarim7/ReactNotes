import React from "react";

import Aux from "../../../hoc/Aux";
import classes from "./Modal.module.css";

const modal = (props) => {
  let attachedClasses = [classes.Modal, classes.Close];

  if (props.show) {
    attachedClasses = [classes.Modal, classes.Open];
  }

  return (
    <Aux>
      <div className={attachedClasses.join(" ")}>
        <div className={classes.ModalContent}>{props.children}</div>
      </div>
    </Aux>
  );
};

export default modal;
