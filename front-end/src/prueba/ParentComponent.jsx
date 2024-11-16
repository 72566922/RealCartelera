// ParentComponent.js
import React, { useState } from "react";
import ChildComponent from "./ChildComponent";

const ParentComponent = () => {
  const [count, setCount] = useState(0);

  const handleIncrement = (value) => {
    setCount(count + value);
  };

  return (
    <div>
      <h1>Número en el padre: {count}</h1>
      <ChildComponent onIncrement={handleIncrement} />
    </div>
  );
};

export default ParentComponent;
