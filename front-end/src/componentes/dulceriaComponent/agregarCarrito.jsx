import React from "react"; // Importa React para poder utilizar JSX

// Componente AgregarCarrito que recibe las props manejarVenta y disabled
function AgregarCarrito({ manejarVenta, disabled }) {
    return (
        <button
            type="button" // Tipo de botón
            className="btn btn-primary btn-sm" // Clases de Bootstrap para estilos
            onClick={manejarVenta} // Función a ejecutar al hacer clic en el botón
            disabled={disabled} // Deshabilitar el botón si la prop 'disabled' es verdadera
        >
            Agregar al Carrito {/* Texto que se muestra en el botón */}
        </button>
    );
}

export default AgregarCarrito; // Exporta el componente AgregarCarrito para su uso en otros lugares
