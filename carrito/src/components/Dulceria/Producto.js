import React, { useState, useEffect } from 'react';
import { useCarrito } from '../context/CarritoContext';

const Producto = ({ item }) => {
    // Se obtienen las funciones y el estado del carrito desde el contexto
    const { agregarAlCarritoDulceria, carritoDulceria } = useCarrito();

    // Estados locales para manejar la cantidad seleccionada, el mensaje y la cantidad en el carrito
    const [cantidad, setCantidad] = useState(1);
    const [mensaje, setMensaje] = useState(""); // Estado para mostrar un mensaje temporal
    const [cantidadEnCarrito, setCantidadEnCarrito] = useState(0); // Estado para la cantidad en carrito

    const manejarCambioCantidad = (e) => {
        // Se obtiene el valor de la cantidad y se asegura de que sea un número válido
        const nuevaCantidad = e.target.value ? parseInt(e.target.value) : "";  // Permitir vacío

        // Si la cantidad total excede el stock disponible, se muestra un mensaje de advertencia
        if (nuevaCantidad && nuevaCantidad + cantidadEnCarrito > item.cantidad) {
            setMensaje(`No puedes agregar más de ${item.cantidad - cantidadEnCarrito} unidades, ya tienes ${cantidadEnCarrito} en el carrito.`);
        } else {
            setMensaje(""); // Resetea el mensaje si la cantidad es válida
            setCantidad(nuevaCantidad); // Permitir valores vacíos o números válidos
        }
    };

    // Función para manejar la adición al carrito
    const agregarConCantidad = () => {
        // Verificar que la cantidad sea válida antes de agregar al carrito
        if (cantidad && cantidad + cantidadEnCarrito <= item.cantidad) {
            alert(`Vas a agregar ${cantidad} unidad(es) de ${item.nombre} al carrito.`);
            const productoConCantidad = { ...item, cantidad };
            agregarAlCarritoDulceria(productoConCantidad);
            setMensaje(`${item.nombre} agregado al carrito.`);
            setCantidad(""); // Resetea a vacío después de agregar al carrito
            setTimeout(() => {
                setMensaje("");
            }, 1500);
        } else {
            setMensaje(`No puedes agregar más de ${item.cantidad - cantidadEnCarrito} unidades, ya tienes ${cantidadEnCarrito} en el carrito.`);
        }
    };


    // Esta función se ejecuta cuando el componente se monta o cuando cambia el carrito
    useEffect(() => {
        // Comprobar si el producto ya está en el carrito
        const productoEnCarrito = carritoDulceria.find((producto) => producto.id === item.id);

        // Si el producto ya está en el carrito, se establece la cantidad
        if (productoEnCarrito) {
            setCantidadEnCarrito(productoEnCarrito.cantidad);
        } else {
            setCantidadEnCarrito(0); // Si no está en el carrito, la cantidad es 0
        }
    }, [carritoDulceria, item.id]);

    // Función para cerrar el mensaje temporal
    const cerrarMensaje = () => {
        setMensaje(""); // Resetea el mensaje cuando se cierra
    };

    return (
        <div className="producto-card card text-center p-9"> {/* Ajustar padding de la tarjeta */}
            {/* Mostrar la imagen del producto si existe */}
            {item.imagenUrl && (
                <img
                    src={item.imagenUrl}
                    alt={item.nombre}
                    className="card-img-top producto-imagen img-fluid"
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
                <p className="card-text fs-9">Precio: $/. {item.precio.toFixed(2)}</p>
                <p className="card-text fs-9">Unidades disponibles: {item.cantidad}</p>

                <label htmlFor={`cantidad-${item.id}`} className="fs-6">Cantidad:</label>
                <input
                    type="number"
                    id={`cantidad-${item.id}`}
                    value={cantidad}
                    min="1"
                    max={item.cantidad - cantidadEnCarrito} // Limitar el máximo basado en el stock y lo que ya hay en el carrito
                    onChange={manejarCambioCantidad}
                    className="form-control"
                    style={{ fontSize: '1.2rem' }}
                />

                <button
                    onClick={agregarConCantidad}
                    disabled={cantidad <= 0 || cantidad + cantidadEnCarrito > item.cantidad} // Deshabilitar si la cantidad total excede el stock
                    className="btn btn-primary mt-3 fs-5"
                >
                    Agregar al carrito
                </button>

                {/* Mostrar mensaje de feedback si existe */}
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
