import React from 'react'; // Importa React desde la librería 'react'.
import AsientoItem from './AsientoItem'; // Importa el componente AsientoItem, que representa cada asiento individual.
import './asientoModal.css'; // Asegúrate de que este archivo CSS esté importado para el estilo de los asientos.

// Componente AsientoList, recibe las propiedades asientos, selectedAsientos, boletosSet y onCheckboxChange.
const AsientoList = ({ asientos, selectedAsientos, boletosSet, onCheckboxChange }) => {
    return (
        <div className="asiento-grid"> {/* Contenedor para la lista de asientos, aplicando una clase CSS para el estilo */}
            {asientos.map(asiento => { // Mapea a través de los asientos, creando un AsientoItem por cada uno.
                const isBlocked = boletosSet.has(asiento.id_asiento); // Verifica si el asiento está bloqueado (ya reservado) en el conjunto de boletos (boletosSet).
                return (
                    <AsientoItem
                        key={asiento.id_asiento} // Asigna una clave única para cada asiento, basada en su ID.
                        asiento={asiento} // Pasa la información del asiento al componente AsientoItem.
                        isBlocked={isBlocked} // Indica si el asiento está bloqueado.
                        isSelected={selectedAsientos.has(asiento.id_asiento)} // Indica si el asiento está seleccionado por el usuario.
                        onCheckboxChange={onCheckboxChange} // Función que maneja los cambios en el estado del checkbox del asiento.
                    />
                );
            })}
        </div>
    );
};

export default AsientoList; // Exporta el componente AsientoList para que pueda ser utilizado en otros lugares.
