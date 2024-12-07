/**import React from 'react';

const ListaProductos = ({ productos, tipo }) => {
    if (productos.length === 0) {
        return <p>No hay productos en esta categoría.</p>;
    }

    return (
        <div>
            {productos.map((producto) => (
                <div key={`${tipo}-${producto.id}`}> {/* Asegúrate de que esta key sea única }
                <p>{producto.nombre}</p>
                <p>Precio: S/. {producto.precioTotal.toFixed(2)}</p>
                {tipo === "Boleto" && (
                    <p>Función ID: {producto.id_funcion}, Asiento ID: {producto.id_asiento}, Precio: S/. {producto.precio}</p>
                )}
            </div>
        ))}
    </div>
);
};

export default ListaProductos;
*/