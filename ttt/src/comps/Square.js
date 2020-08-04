import React from "react";

const square = (props) => {
  const style = {
    backgroundColor: "grey",
    fontSize: "14px",
    width: "24px",
    borderRadius: "4px",
  };
  return (
    <button className="square" style={style} onClick={() => props.onClick()}>
      {props.value}
    </button>
  );
};
export default square;
