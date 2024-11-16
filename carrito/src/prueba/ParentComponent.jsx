import React, { useState } from "react";
import ChildComponent from "./ChildComponent";

const ParentComponent = () => {
  const [message, setMessage] = useState("");

  const handleChildAction = (childData) => {
    setMessage(`Mensaje personalizado del hijo: ${childData}`);
  };

  return (
    <div>
      <h1>Mensaje del hijo: {message}</h1>
      <ChildComponent onAction={handleChildAction} />
    </div>
  );
};

export default ParentComponent;
