import React, { useState } from 'react';

// Componente funcional para buscar por nombre
function BuscarNombre({ onSearch }) {
    // Hook de estado para manejar el valor del input
    const [inputValue, setInputValue] = useState('');

    // Maneja los cambios en el input
    const handleChange = (event) => {
        const value = event.target.value; // Obtiene el valor actual del input
        setInputValue(value); // Actualiza el estado del input
        onSearch(value); // Llama a la función onSearch para filtrar automáticamente
    };

    // Maneja la acción de buscar al presionar el botón "Buscar"
    const handleSearch = () => {
        onSearch(inputValue); // Llama a la función onSearch con el valor actual del input
    };

    // Maneja la acción de limpiar el input al presionar el botón "Limpiar"
    const handleClear = () => {
        setInputValue(''); // Resetea el valor del input al estado inicial
        onSearch(''); // Llama a onSearch con un valor vacío para reiniciar los resultados
    };

    return (
        <div className="d-flex align-items-center mb-4">
            {/* Campo de entrada de texto */}
            <input
                type="text" // Especifica que el input es de tipo texto
                placeholder="Buscar por nombre" // Texto que aparece como placeholder
                value={inputValue} // Conecta el valor del input con el estado
                onChange={handleChange} // Maneja el evento de cambio (escribir en el input)
                className="form-control me-2" // Estilo Bootstrap para darle formato al input
            />
            {/* Botón para realizar la búsqueda */}
            <button onClick={handleSearch} className="btn btn-primary me-2">
                Buscar
            </button>
            {/* Botón para limpiar el input */}
            <button onClick={handleClear} className="btn btn-secondary">
                Limpiar
            </button>
        </div>
    );
}

export default BuscarNombre;
