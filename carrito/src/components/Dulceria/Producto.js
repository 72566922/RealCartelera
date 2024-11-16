import React, { useState } from 'react';
import { useCarrito } from '../context/CarritoContext';

const Producto = ({ item }) => {
    const { agregarAlCarritoDulceria } = useCarrito();
    const [cantidad, setCantidad] = useState(1);
    const [mensaje, setMensaje] = useState(""); // Estado para mostrar un mensaje temporal

    const manejarCambioCantidad = (e) => {
        const nuevaCantidad = parseInt(e.target.value) || 1;
        setCantidad(nuevaCantidad > 0 ? nuevaCantidad : 1); // Respetar mínimo 1
    };

    const agregarConCantidad = () => {
        if (cantidad > 0) {
            const productoConCantidad = { ...item, cantidad };
            console.log("Datos del producto:", productoConCantidad); // Mostrar datos del producto por consola
            agregarAlCarritoDulceria(productoConCantidad);
            setMensaje(`${item.nombre} agregado al carrito.`);
            setCantidad(1); // Resetea la cantidad después de agregar

            setTimeout(() => {
                setMensaje("");
            }, 1500);
        } else {
            setMensaje("La cantidad debe ser al menos 1.");
        }
    };

    // Función para cerrar el mensaje
    const cerrarMensaje = () => {
        setMensaje("");
    };

    return (
        <div className="producto-card card text-center p-9"> {/* Ajustar padding de la tarjeta */}
            {/* Mostrar la imagen del producto */}
            {item.imagenUrl && (
                <img
                    src={item.imagenUrl}
                    alt={item.nombre}
                    className="card-img-top producto-imagen img-fluid" // Agregar clase 'img-fluid' para imagen responsiva
                    style={{
                        maxWidth: '200px',  // Reducir tamaño máximo de la imagen
                        maxHeight: '200px', // Reducir tamaño máximo de la imagen
                        minWidth: '150px',  // Reducir tamaño mínimo de la imagen
                        minHeight: '150px'  // Reducir tamaño mínimo de la imagen
                    }}
                />
            )}
            <div className="card-body">
                <h3 className="card-title fs-5">{item.nombre}</h3>
                <p className="card-text fs-9">Precio: S/. {item.precio.toFixed(2)}</p>
                <p className="card-text fs-9">Unidades: {item.cantidad}</p>


                <label htmlFor={`cantidad-${item.id}`} className="fs-6">Cantidad:</label>
                <input
                    type="number"
                    id={`cantidad-${item.id}`}
                    value={cantidad}
                    min="1"
                    onChange={manejarCambioCantidad}
                    className="form-control"
                    style={{ fontSize: '1.2rem' }}
                />

                <button onClick={agregarConCantidad} disabled={cantidad <= 0} className="btn btn-primary mt-3 fs-5">
                    Agregar al carrito
                </button>

                {/* Mensaje de feedback */}
                {mensaje && (
                    <div className="mensaje-carrito text-success d-flex justify-content-between align-items-center">
                        <p>{mensaje}</p>
                        <button onClick={cerrarMensaje} className="btn-close" aria-label="Close"></button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Producto;
