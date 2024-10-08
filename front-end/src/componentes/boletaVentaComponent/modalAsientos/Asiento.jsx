// src/componentes/modalAsientos/Asiento.jsx
import React from 'react';
import './modalStyle.css';

const Asiento = ({ id, seleccionado, estado, onToggle }) => {
    return (
        <div
            className={`asiento ${estado === 'deshabilitado' ? 'asiento-deshabilitado' : 'asiento-habilitado'} ${seleccionado ? 'seleccionado' : ''}`}
            onClick={onToggle}
        >
            {seleccionado && <span className="asiento-nombre">Seleccionado</span>}
            {!seleccionado && <span>{`Asiento ${id}`}</span>} {/* Cambia a tu lógica para mostrar el nombre */}
        </div>
    );
};

export default Asiento;
