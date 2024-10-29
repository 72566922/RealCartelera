import React from 'react';
import AgregarCarrito from '../../dulceriaComponent/agregarCarrito';

function ModalFooter({ onClose, asientosSeleccionados, obtenerTotalAsientos, handleAgregarCarrito, imprimirDatos, manejarVenta }) {
    return (
        <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cerrar</button>
            <button type="button" className="btn btn-primary" onClick={imprimirDatos}>Imprimir Datos</button>
            <AgregarCarrito 
                manejarVenta={handleAgregarCarrito} // Pasa manejarVenta aquí
                disabled={asientosSeleccionados.length === 0} 
            />
        </div>
    );
}

export default ModalFooter;
