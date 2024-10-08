// src/componentes/modalAsientos/AsientosGrid.jsx
import React from 'react';

function AsientosGrid({ asientos, asientosSeleccionados, handleSelect }) {
    return (
        
        <div className="asientos-grid">
            {asientos.map((asiento) => (
                <div
                    key={asiento.id_asiento}
                    className={`asiento ${asiento.estado === 'deshabilitado' ? 'asiento-deshabilitado' : 'asiento-habilitado'} ${asientosSeleccionados.some(a => a.id_asiento === asiento.id_asiento) ? 'seleccionado' : ''}`}
                    onClick={() => asiento.estado === 'habilitado' && handleSelect(asiento)}
                >
                    {asiento.nombre}
                </div>
            ))}
        </div>
    );
}

export default AsientosGrid;
