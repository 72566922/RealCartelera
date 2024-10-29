// src/componentes/modalAsientos/ModalBody.jsx
import React from 'react';
import AsientosGrid from './AsientosGrid'; // Importa el componente de la cuadrícula

function ModalBody({ asientos, asientosSeleccionados, handleSelect }) {
    return (
        <div className="modal-body">
            <AsientosGrid 
                asientos={asientos} 
                asientosSeleccionados={asientosSeleccionados} 
                handleSelect={handleSelect} 
            />
            <div className="info-seleccion">
                <p>Asientos Seleccionados: {asientosSeleccionados.map(a => a.nombre).join(', ')}</p>
                <p>Total Asientos Seleccionados: {asientosSeleccionados.length}</p>
            </div>
        </div>
    );
}

export default ModalBody;
