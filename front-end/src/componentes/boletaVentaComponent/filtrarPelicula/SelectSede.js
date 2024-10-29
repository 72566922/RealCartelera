// src/components/SelectSede.js
import React from 'react';
import './style.css';

const SelectSede = ({ sedesUnicas, selectedSede, handleSedeChange }) => {
    return (
        <div className="col-md-6 mb-3"> {/* Tamaño ajustado a mitad de pantalla en dispositivos medianos */}
            <div className="form-group">
                <select 
                    id="selectSede" 
                    className="form-select form-select-sm"  // Tamaño pequeño del select
                    value={selectedSede} 
                    onChange={handleSedeChange}
                >
                    <option value="">Selecciona una sede</option>
                    {sedesUnicas.map((sede, index) => (
                        <option key={index} value={sede}>
                            {sede}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default SelectSede;
