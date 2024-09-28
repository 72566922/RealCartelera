import React, { useState } from 'react';

function Boleteria({ addToCart, bebidas }) {
  const [selectedBebida, setSelectedBebida] = useState(null);
  const [cantidad, setCantidad] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedBebida && cantidad) {
      addToCart({ ...selectedBebida, cantidad: parseInt(cantidad) }); // Agregar la bebida y cantidad al carrito
      setCantidad('');
      setSelectedBebida(null); // Resetear selección
    }
  };

  return (
    <div>
      <h2>Boleteria</h2>
      <form onSubmit={handleSubmit}>
        <select onChange={(e) => setSelectedBebida(JSON.parse(e.target.value))} value={selectedBebida ? JSON.stringify(selectedBebida) : ''}>
          <option value="">Selecciona una bebida</option>
          {/* Aquí deberías mapear tus bebidas desde un prop o estado */}
          {bebidas.map(bebida => (
            <option key={bebida.id} value={JSON.stringify(bebida)}>
              {bebida.nombre} - {bebida.litros} L - ${bebida.precio}
            </option>
          ))}
        </select>
        <input
          type="number"
          value={cantidad}
          onChange={(e) => setCantidad(e.target.value)}
          placeholder="Ingresa cantidad"
          min="1"
        />
        <button type="submit" className="btn btn-primary">Agregar al Carrito</button>
      </form>
    </div>
  );
}

export default Boleteria;
