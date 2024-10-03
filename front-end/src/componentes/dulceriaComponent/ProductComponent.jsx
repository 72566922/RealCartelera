// src/componentes/dulceriaComponent/ProductComponent.jsx
import React from 'react';

const ProductComponent = ({ product, onVender }) => {
  const handleClick = () => {
    const ventas = {
      id: product.id,
      cantidadSeleccionada: 1, // Aquí puedes ajustar según tus necesidades
      precioTotal: product.precio, // Asegúrate de que este campo exista
      // Agrega otros datos que necesites para la venta
    };
    onVender(ventas);
  };

  return (
    <div>
      <h4>{product.nombre}</h4>
      <p>Precio: ${product.precio}</p>
      <button onClick={handleClick}>Vender</button>
    </div>
  );
};

export default ProductComponent;
