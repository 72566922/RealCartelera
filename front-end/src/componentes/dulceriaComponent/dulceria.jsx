// Dulceria.js
import React, { useState } from 'react';
import BebidaSelector from './bebidas/BebidaSelector';
import ComidaSelector from './comida/ComidaSelector';
import InputCantidad from './InputCantidad';
import AgregarCarrito from './agregarCarrito';
import './styleDulceria/dulceria.css';

function Dulceria({ bebidas, comidas, addToCartBebida, addToCartComida }) {
  const [cantidadBebida, setCantidadBebida] = useState(0);
  const [bebidaSeleccionada, setBebidaSeleccionada] = useState(null);
  const [cantidadComida, setCantidadComida] = useState(0);
  const [comidaSeleccionada, setComidaSeleccionada] = useState(null);

  const manejarVentaBebida = () => {
    if (!bebidaSeleccionada) {
      alert("Por favor, selecciona una bebida válida.");
      return;
    }
  
    if (cantidadBebida <= 0 || isNaN(cantidadBebida)) {
      alert("Selecciona una cantidad válida");
      return;
    }
  
    const bebidaActualizada = {
      ...bebidaSeleccionada,
      cantidadSeleccionada: cantidadBebida,
      precioTotal: bebidaSeleccionada.precio * cantidadBebida
    };
  
    addToCartBebida(bebidaActualizada); // Usa la función específica para bebidas
    alert(`¡${bebidaSeleccionada.nombre} agregada al carrito con éxito!`);
    setCantidadBebida(0);
  };

  const manejarVentaComida = () => {
    if (!comidaSeleccionada) {
      alert("Por favor, selecciona una comida válida.");
      return;
    }

    if (cantidadComida <= 0 || isNaN(cantidadComida)) {
      alert("Selecciona una cantidad válida");
      return;
    }

    const comidaActualizada = {
      ...comidaSeleccionada,
      cantidadSeleccionada: cantidadComida,
      precioTotal: comidaSeleccionada.precio * cantidadComida
    };

    addToCartComida(comidaActualizada); // Usa la función específica para comidas
    alert(`¡${comidaSeleccionada.nombre} agregada al carrito con éxito!`);
    setCantidadComida(0);
  };

  return (
    <div className="container">
      <h2>Dulcería</h2>
      <div className="row">
        <div className="col-md-6 mb-3">
          <BebidaSelector bebidas={bebidas} setBebidaSeleccionada={setBebidaSeleccionada} />
          <InputCantidad cantidad={cantidadBebida} setCantidad={setCantidadBebida} />
          <AgregarCarrito manejarVenta={manejarVentaBebida} text="Agregar Bebida" />
        </div>

        <div className="col-md-6 mb-3">
          <ComidaSelector comidas={comidas} setComidaSeleccionada={setComidaSeleccionada} />
          <InputCantidad cantidad={cantidadComida} setCantidad={setCantidadComida} />
          <AgregarCarrito manejarVenta={manejarVentaComida} text="Agregar Comida" />
        </div>
      </div>
    </div>
  );
}

export default Dulceria;
