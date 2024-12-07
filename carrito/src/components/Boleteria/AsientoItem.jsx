import React from 'react'; // Importa React desde la librería 'react'.
import './asientoModal.css'; // Asegúrate de que este archivo CSS esté importado para el estilo de los asientos.

// Componente AsientoItem, recibe las propiedades asiento, isBlocked, isSelected y onCheckboxChange.
const AsientoItem = ({ asiento, isBlocked, isSelected, onCheckboxChange }) => {
    // Función que maneja el clic en el asiento. Solo se ejecuta si el asiento no está bloqueado.
    const handleClick = () => {
        if (!isBlocked) { // Verifica si el asiento no está bloqueado.
            onCheckboxChange(asiento.id_asiento); // Llama a la función de cambio de checkbox pasando el ID del asiento.
        }
    };

    return (
        <div
            // Asigna clases dinámicas al div que representa el asiento. 
            // Si el asiento está bloqueado, agrega la clase 'asiento-bloqueado'.
            // Si el asiento está seleccionado, agrega la clase 'asiento-seleccionado'.
            className={`asiento ${isBlocked ? 'asiento-bloqueado' : ''} ${isSelected ? 'asiento-seleccionado' : ''}`}
            onClick={handleClick} // Maneja el clic en el asiento llamando a handleClick.
            title={isBlocked ? "Asiento bloqueado" : `Asiento ${asiento.nombre}`} // Muestra un mensaje emergente (tooltip) con información sobre el asiento.
        >
            {/* El contenido del div está vacío, ya que solo se utiliza para el estilo visual. */}
        </div>
    );
};

export default AsientoItem; // Exporta el componente AsientoItem para que pueda ser utilizado en otros lugares.
