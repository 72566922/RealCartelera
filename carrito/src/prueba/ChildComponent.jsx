import React from "react";

const ChildComponent = ({ onAction }) => {
  return (
    <button onClick={() => onAction("¡Este es un mensaje único desde el hijo!")}>
      Enviar mensaje único al padre
    </button>
  );
};

export default ChildComponent;
