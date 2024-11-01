import React, { useState } from 'react';

function BuscarNombre({ onSearch }) {
    const [inputValue, setInputValue] = useState('');

    const handleChange = (event) => {
        const value = event.target.value;
        setInputValue(value); // Actualiza el valor del input
        onSearch(value); // Llama a onSearch para filtrar automáticamente
    };

    const handleSearch = () => {
        onSearch(inputValue); // Llama a onSearch al presionar el botón
    };

    const handleClear = () => {
        setInputValue(''); // Limpia el input
        onSearch(''); // Limpia la búsqueda
    };

    return (
        <div className="d-flex align-items-center mb-4">
            <input
                type="text"
                placeholder="Buscar por nombre"
                value={inputValue}
                onChange={handleChange} // Actualiza al escribir
                className="form-control me-2" // Estilo de Bootstrap para el input
            />
            <button onClick={handleSearch} className="btn btn-primary me-2">
                Buscar
            </button>
            <button onClick={handleClear} className="btn btn-secondary">
                Limpiar
            </button>
        </div>
    );
}

export default BuscarNombre;
