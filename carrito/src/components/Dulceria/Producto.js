// Producto.js
import React, { useState } from 'react';
import { useCarrito } from '../context/CarritoContext';

const Producto = ({ item }) => {
    const { agregarAlCarritoDulceria } = useCarrito(); 
    const [cantidad, setCantidad] = useState(1); 

    const manejarCambioCantidad = (e) => {
        const nuevaCantidad = parseInt(e.target.value) || 1; // Garantizar que nunca sea NaN
        setCantidad(nuevaCantidad > 0 ? nuevaCantidad : 1); // Respetar mínimo 1
    };

    const agregarConCantidad = () => {
        if (cantidad > 0) {
            agregarAlCarritoDulceria({ ...item, cantidad });
            alert(`${item.nombre} agregado al carrito.`);
        } else {
            alert("La cantidad debe ser al menos 1.");
        }
    };

    return (
        <div>
            <h3>{item.nombre}</h3>
            <p>Precio: S/. {item.precio.toFixed(2)}</p>
            <label htmlFor="cantidad">Cantidad:</label>
            <input
                type="number"
                id="cantidad"
                value={cantidad}
                min="1"
                onChange={manejarCambioCantidad}
            />
            <button onClick={agregarConCantidad} disabled={cantidad <= 0}>Agregar al carrito</button>
        </div>
    );
};

export default Producto;
