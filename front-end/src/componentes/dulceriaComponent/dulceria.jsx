import React, { useState } from 'react';
import BebidaSelector from './bebidas/BebidaSelector';
import ComidaSelector from './comida/ComidaSelector';
import InputCantidad from './InputCantidad';
import AgregarCarrito from './agregarCarrito';
import './styleDulceria/dulceria.css';
import AsientoSelect from '../asientoComponent/AsientoSelected';

function Dulceria({ bebidas, comidas, addToCartBebida, addToCartComida }) {
  const [cantidadBebida, setCantidadBebida] = useState(0);
  const [bebidaSeleccionada, setBebidaSeleccionada] = useState(null);
  const [cantidadComida, setCantidadComida] = useState(0);
  const [comidaSeleccionada, setComidaSeleccionada] = useState(null);

  const manejarVenta = (itemSeleccionado, cantidad, addToCart) => {
    if (!itemSeleccionado) {
      alert("Por favor, selecciona un item válido.");
      return;
    }

    if (cantidad <= 0 || isNaN(cantidad)) {
      alert("Selecciona una cantidad válida");
      return;
    }

    const itemActualizado = {
      ...itemSeleccionado,
      cantidadSeleccionada: cantidad,
      precioTotal: itemSeleccionado.precio * cantidad
    };

    addToCart(itemActualizado);
    alert(`¡${itemSeleccionado.nombre} agregado al carrito con éxito!`);
    return 0; // Devolver cero para resetear la cantidad
  };

  const manejarVentaBebida = () => {
    setCantidadBebida(manejarVenta(bebidaSeleccionada, cantidadBebida, addToCartBebida));
  };

  const manejarVentaComida = () => {
    setCantidadComida(manejarVenta(comidaSeleccionada, cantidadComida, addToCartComida));
  };

  return (
    <div className="dulceria-container container">
      <h2 className="text-center mb-4">Dulcería</h2>
      <div className="row">
        {/* Sección de Bebidas */}
        <div className="col-md-6">
          <div className="card card-custom">
            <h5 className="text-center">Selecciona una Bebida</h5>
            <BebidaSelector bebidas={bebidas} setBebidaSeleccionada={setBebidaSeleccionada} />
            <div className="input-group input-group-custom">
              <InputCantidad cantidad={cantidadBebida} setCantidad={setCantidadBebida} />
            </div>
            <AgregarCarrito manejarVenta={manejarVentaBebida} text="Agregar Bebida" className="btn btn-custom w-100" />
          </div>
        </div>

        {/* Sección de Comidas */}
        <div className="col-md-6">
          <div className="card card-custom">
            <h5 className="text-center">Selecciona una Comida</h5>
            <ComidaSelector comidas={comidas} setComidaSeleccionada={setComidaSeleccionada} />
            <div className="input-group input-group-custom">
              <InputCantidad cantidad={cantidadComida} setCantidad={setCantidadComida} />
            </div>
            <AgregarCarrito manejarVenta={manejarVentaComida} text="Agregar Comida" className="btn btn-custom w-100" />
          </div>
        </div>
      </div>

      {/* Sección de selección de asientos */}
      <div className="mt-4">
        <AsientoSelect />
      </div>
    </div>
  );
}

export default Dulceria;
