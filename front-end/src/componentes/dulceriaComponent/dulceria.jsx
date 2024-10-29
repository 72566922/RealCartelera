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
    };      

    const manejarVentaBebida = () => {
        manejarVenta(bebidaSeleccionada, cantidadBebida, addToCartBebida);
        setCantidadBebida(0); // Resetear cantidad
    };

    const manejarVentaComida = () => {
        manejarVenta(comidaSeleccionada, cantidadComida, addToCartComida);
        setCantidadComida(0); // Resetear cantidad
    };

    return (
        <div className="dulceria-container container">
            <h2 className="text-center mb-4">Dulcería</h2>
            <div className="row">
                <div className="col-md-6">
                    <div className="card card-custom">
                        <h5 className="text-center">Selecciona una Bebida</h5>
                        <BebidaSelector bebidas={bebidas} setBebidaSeleccionada={setBebidaSeleccionada} />
                        <div className="input-group input-group-custom">
                            <InputCantidad cantidad={cantidadBebida} setCantidad={setCantidadBebida} />
                        </div>
                        <AgregarCarrito 
                            manejarVenta={manejarVentaBebida} 
                            disabled={!bebidaSeleccionada || cantidadBebida <= 0} 
                            text="Agregar Bebida" 
                            className="btn btn-custom w-100" 
                        />
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="card card-custom">
                        <h5 className="text-center">Selecciona una Comida</h5>
                        <ComidaSelector comidas={comidas} setComidaSeleccionada={setComidaSeleccionada} />
                        <div className="input-group input-group-custom">
                            <InputCantidad cantidad={cantidadComida} setCantidad={setCantidadComida} />
                        </div>
                        <AgregarCarrito 
                            manejarVenta={manejarVentaComida} 
                            disabled={!comidaSeleccionada || cantidadComida <= 0} 
                            text="Agregar Comida" 
                            className="btn btn-custom w-100" 
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dulceria;
