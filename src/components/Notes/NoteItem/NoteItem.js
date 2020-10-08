import React, { useState, useEffect } from "react";
import classes from "./NoteItem.module.css";
import Aux from "../../../hoc/Aux";

const NoteItem = (props) => {
  return (
    <div className={classes.NotesMasonry}>
      <div className={classes.NotesItem}>
        <div>testingin</div>
        <div>testingin</div>
        <div>testingin</div>
        <div>testingin</div>
        <div>testingin</div>
      </div>
    </div>
  );
};

export default NoteItem;
