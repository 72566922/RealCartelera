/*
import React from 'react';
import { useCarrito } from '../context/CarritoContext'; // Asegúrate de que la ruta sea correcta

const CarritoCompras = () => {
  const { carritoDulceria, eliminarDelCarritoDulceria } = useCarrito(); // Cambiado a carritoDulceria

  return (
    <div>
      <h2>Carrito de Compras</h2>
      {carritoDulceria.length === 0 ? ( // Verificamos carritoDulceria
        <p>No hay productos en el carrito.</p>
      ) : (
        carritoDulceria.map(item => (
          <div key={item.id}>
            <p>{item.nombre} - {item.cantidad}</p>
            <button onClick={() => eliminarDelCarritoDulceria(item.id)}>Eliminar</button>
          </div>
        ))
      )}
    </div>
  );
};

export default CarritoCompras;
 */