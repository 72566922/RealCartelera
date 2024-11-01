// AsientoItem.js
import React from 'react';
import './asientoModal.css'; // Asegúrate de que este archivo esté importado

const AsientoItem = ({ asiento, isBlocked, isSelected, onCheckboxChange }) => {
    const handleClick = () => {
        if (!isBlocked) {
            onCheckboxChange(asiento.id_asiento);
        }
    };

    return (
        <div
            className={`asiento ${isBlocked ? 'asiento-bloqueado' : ''} ${isSelected ? 'asiento-seleccionado' : ''}`}
            onClick={handleClick}
            title={isBlocked ? "Asiento bloqueado" : `Asiento ${asiento.nombre}`}
        >

        </div>
    );
};

export default AsientoItem;
