// ChildComponent.js
import React from "react";

const ChildComponent = ({ onIncrement }) => {
  return (
    <button onClick={() => onIncrement(1)}>
      Incrementar número en el padre
    </button>
  );
};

export default ChildComponent;
