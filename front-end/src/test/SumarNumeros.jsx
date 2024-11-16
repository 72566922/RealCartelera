import React, { useState } from 'react';

const SumarNumeros = () => {
  const [numero1, setNumero1] = useState(0);
  const [numero2, setNumero2] = useState(0);
  const [resultado, setResultado] = useState(null);

  const manejarSuma = () => {
    setResultado(numero1 + numero2);
  };

  return (
    <div>
      <h2>Sumar dos números</h2>
      <input
        type="number"
        value={numero1}
        onChange={(e) => setNumero1(Number(e.target.value))}
        placeholder="Número 1"
      />
      <input
        type="number"
        value={numero2}
        onChange={(e) => setNumero2(Number(e.target.value))}
        placeholder="Número 2"
      />
      <button onClick={manejarSuma}>Sumar</button>
      {resultado !== null && <p>Resultado: {resultado}</p>}
    </div>
  );
};

export default SumarNumeros;
