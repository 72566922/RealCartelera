// src/components/SelectHora.js
import React from 'react';
import './style.css';

const SelectHora = ({ horasDisponibles, selectedHora, handleHoraChange, selectedSede }) => {
    return (
        <div className="col-md-6 mb-3"> {/* Tamaño ajustado para ocupar mitad de pantalla */}
            <div className="form-group">
                <select 
                    id="selectHora" 
                    className="form-select form-select-sm"  // Tamaño pequeño del select
                    value={selectedHora} 
                    onChange={handleHoraChange} 
                    disabled={!selectedSede}
                >
                    <option value="">Selecciona una hora</option>
                    {horasDisponibles.map((hora, index) => (
                        <option key={index} value={hora}>
                            {hora}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default SelectHora;
