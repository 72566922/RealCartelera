// src/componentes/modalAsientos/ModalHeader.jsx
import React from 'react';

function ModalHeader({ nombreSala, nombreSede, onClose }) {
    return (
        <div className="modal-header">
            <h5 className="modal-title">Selecciona Tu Asiento para la Sala: {nombreSala} - Sede: {nombreSede}</h5>
            <button type="button" className="close" onClick={onClose}>
                <span>&times;</span>
            </button>
        </div>
    );
}

export default ModalHeader;
