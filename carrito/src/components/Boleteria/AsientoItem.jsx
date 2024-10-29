import React from 'react';

const AsientoItem = ({ asiento, isBlocked, isSelected, onCheckboxChange }) => {
    return (
        <li key={asiento.id_asiento} style={{ opacity: isBlocked ? 0.5 : 1 }}>
            <label>
                <input
                    type="checkbox"
                    value={asiento.id_asiento}
                    checked={isSelected} // Asegúrate de que solo esté seleccionado si no está bloqueado
                    onChange={() => {
                        if (!isBlocked) {
                            onCheckboxChange(asiento.id_asiento); // Llama a la función solo si no está bloqueado
                        }
                    }}
                    disabled={isBlocked} // Deshabilitar el checkbox si está bloqueado
                />
                <span className={isBlocked ? 'asiento-bloqueado' : ''}>
                    {asiento.nombre} - {asiento.estado}
                </span>
            </label>
        </li>
    );
};

export default AsientoItem;
