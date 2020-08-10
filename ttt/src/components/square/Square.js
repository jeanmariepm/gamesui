import React from "react";
import classes from "./Square.module.css";
const Square = (props) => {
  return (
    <button className={classes.Square} onClick={() => props.onClick()}>
      {props.value}
    </button>
  );
};
export default Square;
