import React from 'react';

function InputCantidad({ cantidad, setCantidad }) {
  const manejarCambio = (e) => {
    const value = parseInt(e.target.value, 10); // Usa la base 10 al parsear
    if (!isNaN(value) && value >= 0) {
      setCantidad(value); // Establece la cantidad si es válida
    } else {
      setCantidad(0); // Establece la cantidad a 0 si el valor no es válido
    }
  };

  return (
    <div className="form-group">
      <label htmlFor="cantidadInput">Cantidad a vender:</label>
      <input
        type="number"
        className="form-control w-50" // Clase de Bootstrap para ajustar el ancho
        id="cantidadInput"
        value={cantidad} // El valor del input es controlado por el estado externo
        onChange={manejarCambio} // Llama a la función de cambio
        placeholder="Cantidad a vender" // Texto que aparece en el input antes de que se introduzca un valor
        min="0" // Establece un mínimo de 0
        aria-label="Cantidad a vender" // Mejora la accesibilidad
      />
    </div>
  );
}

export default InputCantidad;
