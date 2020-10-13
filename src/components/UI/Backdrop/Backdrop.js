import React from "react";

const backdrop = (props) => <div onClick={props.clicked}>{props.children}</div>;

export default backdrop;
