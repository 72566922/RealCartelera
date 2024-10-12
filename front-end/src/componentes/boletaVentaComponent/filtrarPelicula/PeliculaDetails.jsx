import React from 'react';
import FuncionesPorPelicula from './FuncionesPorPelicula';

const PeliculaDetails = ({ pelicula }) => {
    return (
        <div>
            <FuncionesPorPelicula idPelicula={pelicula.id_pelicula} />
        </div>
    );
};

export default PeliculaDetails;
