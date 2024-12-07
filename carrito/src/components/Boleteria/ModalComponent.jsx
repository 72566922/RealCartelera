/**import React from 'react';
import ModalCarrito from '../ModalCarrito';
import AsientoModal from './AsientoModal';

const ModalComponent = ({ onClose, funcionSeleccionada }) => {
    return (
        <>
            <ModalCarrito onClose={onClose} />
            {funcionSeleccionada && (
                <AsientoModal
                    onClose={onClose}
                    idSala={funcionSeleccionada.sala.id_sala}
                    idFuncion={funcionSeleccionada.id_funcion}
                    nombreSala={funcionSeleccionada.sala.nombre}
                    sede={funcionSeleccionada.sala.sede.distrito.nombre}
                    pelicula={funcionSeleccionada.pelicula.nombre}
                />
            )}
        </>
    );
};

export default ModalComponent;
 */