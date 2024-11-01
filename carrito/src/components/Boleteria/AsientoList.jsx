// AsientoList.js
import React from 'react';
import AsientoItem from './AsientoItem';
import './asientoModal.css'; // Asegúrate de que este archivo esté importado

const AsientoList = ({ asientos, selectedAsientos, boletosSet, onCheckboxChange }) => {
    return (
        <div className="asiento-grid">
            {asientos.map(asiento => {
                const isBlocked = boletosSet.has(asiento.id_asiento); 
                return (
                    <AsientoItem
                        key={asiento.id_asiento}
                        asiento={asiento}
                        isBlocked={isBlocked}
                        isSelected={selectedAsientos.has(asiento.id_asiento)}
                        onCheckboxChange={onCheckboxChange}
                    />
                );
            })}
        </div>
    );
};

export default AsientoList;
