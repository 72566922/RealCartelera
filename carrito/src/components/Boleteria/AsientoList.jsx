import React from 'react';
import AsientoItem from './AsientoItem';

const AsientoList = ({ asientos, selectedAsientos, boletosSet, onCheckboxChange }) => {
    return (
        <div>
            <ul>
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
            </ul>
        </div>
    );
};

export default AsientoList;
