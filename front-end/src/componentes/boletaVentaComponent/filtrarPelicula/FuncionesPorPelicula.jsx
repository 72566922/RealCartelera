import React, { useEffect, useState, useCallback } from 'react';
import FuncionService from '../../../services/FuncionService';
import AsientoService from '../../../services/AsientoService';
import SelectSede from './SelectSede';
import SelectHora from './SelectHora';
import ModalAsientos from '../modalAsientos/ModalAsientos';
import AgregarCarrito from '../../dulceriaComponent/agregarCarrito';
import './style.css';

const FuncionesPorPelicula = ({ idPelicula, addToCart }) => {
    const [funciones, setFunciones] = useState([]);
    const [error, setError] = useState(null);
    const [selectedSede, setSelectedSede] = useState('');
    const [horasDisponibles, setHorasDisponibles] = useState([]);
    const [selectedHora, setSelectedHora] = useState('');
    const [selectedFuncionId, setSelectedFuncionId] = useState(null);
    const [selectedSalaId, setSelectedSalaId] = useState(null);
    const [asientos, setAsientos] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [asientosSeleccionados, setAsientosSeleccionados] = useState([]);

    const fetchFunciones = useCallback(async () => {
        try {
            const response = await FuncionService.getFuncionesPorPelicula(idPelicula);
            setFunciones(response.data);
        } catch (error) {
            setError('Error al obtener las funciones');
        }
    }, [idPelicula]);

    useEffect(() => {
        fetchFunciones();
    }, [fetchFunciones]);

    const handleSedeChange = (event) => {
        const sedeSeleccionada = event.target.value;
        setSelectedSede(sedeSeleccionada);

        const horasParaSede = funciones
            .filter(funcion => funcion.sala.sede.distrito.nombre === sedeSeleccionada)
            .map(funcion => funcion.hora);

        setHorasDisponibles(horasParaSede);
        setSelectedHora('');
        setSelectedFuncionId(null);
        setAsientos([]);
        setAsientosSeleccionados([]);
    };

    const handleHoraChange = async (event) => {
        const horaSeleccionada = event.target.value;
        setSelectedHora(horaSeleccionada);
    
        const funcionSeleccionada = funciones.find(funcion =>
            funcion.hora === horaSeleccionada &&
            funcion.sala.sede.distrito.nombre === selectedSede
        );
    
        if (funcionSeleccionada) {
            setSelectedFuncionId(funcionSeleccionada.id_funcion);
            setSelectedSalaId(funcionSeleccionada.sala.id_sala);
    
            console.log('Función seleccionada:', funcionSeleccionada);
    
            try {
                const response = await AsientoService.getAsientosPorSala(funcionSeleccionada.sala.id_sala);
                setAsientos(response.data);
                console.log('Asientos obtenidos:', response.data);
            } catch (error) {
                setError('Error al obtener los asientos');
            }
        } else {
            setSelectedFuncionId(null);
            setSelectedSalaId(null);
            setAsientos([]);
            setAsientosSeleccionados([]);
        }
    };
    
    const handleModalToggle = () => {
        setShowModal(!showModal);
    };

    const manejarVenta = (asientosSeleccionados) => {
        console.log('Asientos:', asientosSeleccionados);
    };

    const handleSelectAsiento = (asiento) => {
        setAsientosSeleccionados(prev => {
            const yaSeleccionado = prev.some(a => a.id_asiento === asiento.id_asiento);

            if (yaSeleccionado) {
                return prev.filter(a => a.id_asiento !== asiento.id_asiento);
            } else {
                return [...prev, asiento];
            }
        });
    };

    const handleAddToCart = () => {
        if (asientosSeleccionados.length > 0) {
            manejarVenta(asientosSeleccionados); // Asegúrate de usar manejarVenta aquí
            console.log('Asientos agregados al carrito:', asientosSeleccionados);
            setAsientosSeleccionados([]);
            setShowModal(false);
        } else {
            alert('Por favor, selecciona al menos un asiento.');
        }
    };
    

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    const sedesUnicas = [...new Set(funciones.map(funcion => funcion.sala.sede.distrito.nombre))];

    return (
        <div className="mt-4">
            <div className="row">
                <SelectSede
                    sedesUnicas={sedesUnicas}
                    selectedSede={selectedSede}
                    handleSedeChange={handleSedeChange}
                />
                <SelectHora
                    horasDisponibles={horasDisponibles}
                    selectedHora={selectedHora}
                    handleHoraChange={handleHoraChange}
                    selectedSede={selectedSede}
                />
            </div>

            {selectedFuncionId && (
                <div>
                    <p>ID de la Sala: {selectedSalaId}</p>
                    <p>Nombre de la Sala: {funciones.find(funcion => funcion.id_funcion === selectedFuncionId)?.sala.nombre}</p>
                    <p>ID de la Función: {selectedFuncionId}</p>

                    <h5>Asientos seleccionados:</h5>
                    <ul>
                        {asientosSeleccionados.length > 0 ? (
                            asientosSeleccionados.map(asiento => (
                                <li key={asiento.id_asiento}>
                                    ID: {asiento.id_asiento}, Nombre: {asiento.nombre}
                                    <button onClick={() => handleSelectAsiento(asiento)} className="btn btn-danger btn-sm ml-2">
                                        Deseleccionar
                                    </button>
                                </li>
                            ))
                        ) : (
                            <li>No hay asientos seleccionados.</li>
                        )}
                    </ul>

                    <button className="btn btn-primary" onClick={handleModalToggle}>
                        Seleccionar Asientos
                    </button>
                </div>
            )}

            {showModal && (
                <ModalAsientos
                    asientos={asientos}
                    onClose={handleModalToggle}
                    onSelect={handleSelectAsiento}
                    manejarVenta={manejarVenta}
                    idFuncion={selectedFuncionId}
                    nombreSala={funciones.find(funcion => funcion.id_funcion === selectedFuncionId)?.sala.nombre}
                    nombreSede={selectedSede}
                    asientosSeleccionados={asientosSeleccionados}
                />
            )}

            <AgregarCarrito 
                manejarVenta={handleAddToCart} 
                disabled={asientosSeleccionados.length === 0} // Deshabilitar el botón si no hay asientos seleccionados
            />
        </div>
    );
};

export default FuncionesPorPelicula;
