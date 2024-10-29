import React from 'react';

const ListaVentas = ({ ventas }) => {
    if (ventas.length === 0) {
        return <p>No se han realizado ventas aún.</p>;
    }
    return (
        <ul>
            {ventas.map((venta, index) => (
                <li key={index}>
                    <strong>{venta.tipo}:</strong> {venta.nombre} <br />
                    Cantidad: {venta.cantidad} <br />
                    Precio unitario: S/. {venta.precioUnitario} <br />
                    Total: S/. {venta.total}
                </li>
            ))}
        </ul>
    );
};

export default ListaVentas;
