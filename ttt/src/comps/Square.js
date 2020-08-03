import React from "react";

const square = (props) => (
  <button className="square" onClick={() => props.onClick()}>
    {props.value}
  </button>
);
export default square;
