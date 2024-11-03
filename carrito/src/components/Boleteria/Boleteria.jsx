import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import FuncionService from "../../service/FuncionService";
import { useCarrito } from '../context/CarritoContext';
import ModalCarrito from '../ModalCarrito';
import AsientoModal from './AsientoModal';

const Boleteria = () => {
    const location = useLocation();
    const peliculaSeleccionada = location.state?.pelicula;

    const [funciones, setFunciones] = useState([]);
    const [horasDisponibles, setHorasDisponibles] = useState([]);
    const [sedesDisponibles, setSedesDisponibles] = useState([]);
    const [selectedHora, setSelectedHora] = useState('');
    const [selectedSede, setSelectedSede] = useState('');
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [funcionSeleccionada, setFuncionSeleccionada] = useState(null);
    const { agregarAlCarritoFunciones } = useCarrito();

    useEffect(() => {
        const fetchFunciones = async () => {
            try {
                const funcionesResponse = await FuncionService.getAllFunciones();
                const funcionesData = funcionesResponse.data || [];

                // Filtrar las funciones para la película seleccionada
                const funcionesFiltradasPorPelicula = funcionesData.filter(
                    funcion => funcion.pelicula.id_pelicula === peliculaSeleccionada.id_pelicula
                );
                setFunciones(funcionesFiltradasPorPelicula);

                // Extraer las horas y sedes únicas disponibles para la película
                const horasUnicas = [...new Set(funcionesFiltradasPorPelicula.map(funcion => funcion.hora))];
                const sedesUnicas = [...new Set(funcionesFiltradasPorPelicula.map(funcion => funcion.sala.sede.distrito.nombre))];

                setHorasDisponibles(horasUnicas);
                setSedesDisponibles(sedesUnicas);
            } catch (err) {
                setError("Error al cargar funciones");
            }
        };

        if (peliculaSeleccionada) {
            fetchFunciones();
        }
    }, [peliculaSeleccionada]);

    // Efecto para actualizar las sedes al cambiar la hora seleccionada
    useEffect(() => {
        if (selectedHora) {
            const funcionesFiltradasPorHora = funciones.filter(
                funcion => funcion.hora === selectedHora
            );
            const sedesFiltradasPorHora = [...new Set(funcionesFiltradasPorHora.map(funcion => funcion.sala.sede.distrito.nombre))];
            setSedesDisponibles(sedesFiltradasPorHora);
        } else {
            // Mostrar todas las sedes disponibles para la película seleccionada
            const todasSedes = [...new Set(funciones.map(funcion => funcion.sala.sede.distrito.nombre))];
            setSedesDisponibles(todasSedes);
        }
    }, [selectedHora, funciones]);

    // Efecto para actualizar las horas al cambiar la sede seleccionada
    useEffect(() => {
        if (selectedSede) {
            const funcionesFiltradasPorSede = funciones.filter(
                funcion => funcion.sala.sede.distrito.nombre === selectedSede
            );
            const horasFiltradasPorSede = [...new Set(funcionesFiltradasPorSede.map(funcion => funcion.hora))];
            setHorasDisponibles(horasFiltradasPorSede);
        } else {
            // Mostrar todas las horas disponibles para la película seleccionada
            const todasHoras = [...new Set(funciones.map(funcion => funcion.hora))];
            setHorasDisponibles(todasHoras);
        }
    }, [selectedSede, funciones]);

    const agregarAsientosAlCarrito = (funcion, asientos) => {
        // Imprimir en consola los detalles de la función y los asientos
        console.log("Funcion:", funcion);
        console.log("Asientos seleccionados:", asientos);
        
        // Mostrar el precio de la función en la consola
        console.log("Precio de la función:", funcion.precio);
    
        if (!funcion.precio || asientos.length === 0) return;
    
        const funcionConDatos = {
            id: funcion.id_funcion,
            nombre: funcion.pelicula.nombre,
            precio: 0,
            sala: funcion.sala.nombre,
            sede: funcion.sala.sede.distrito.nombre,
            hora: funcion.hora
        };
    
        agregarAlCarritoFunciones(funcionConDatos);
        setIsModalOpen(true);
        setFuncionSeleccionada(funcion);
    };
    
    

    const filteredFunciones = funciones.filter(funcion => {
        return (
            (!selectedHora || funcion.hora === selectedHora) &&
            (!selectedSede || funcion.sala.sede.distrito.nombre === selectedSede)
        );
    });

    return (
        <div className="container">
            <h1>Funciones Disponibles</h1>
            {error && <div className="alert alert-danger">{error}</div>}

            <div className="mb-3">
                <label htmlFor="horaSelect" className="form-label">Seleccionar Hora</label>
                <select id="horaSelect" className="form-select" value={selectedHora} onChange={(e) => setSelectedHora(e.target.value)}>
                    <option value="">Seleccionar Todas las Horas</option>
                    {horasDisponibles.map((hora) => (
                        <option key={hora} value={hora}>{hora}</option>
                    ))}
                </select>
            </div>

            <div className="mb-3">
                <label htmlFor="sedeSelect" className="form-label">Seleccionar Sede</label>
                <select id="sedeSelect" className="form-select" value={selectedSede} onChange={(e) => setSelectedSede(e.target.value)}>
                    <option value="">Seleccionar Todas las Sedes</option>
                    {sedesDisponibles.map((sede) => (
                        <option key={sede} value={sede}>{sede}</option>
                    ))}
                </select>
            </div>

            {filteredFunciones.length > 0 ? (
                <div>
                    <h2>Funciones Disponibles:</h2>
                    <div className="row">
                        {filteredFunciones.map(funcion => (
                            <div className="col-md-4 mb-3" key={funcion.id_funcion}>
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">{funcion.pelicula.nombre} - {funcion.sala.nombre}</h5>
                                        <p className="card-text">Hora: {funcion.hora} - Precio: $/. {funcion.precio}</p>
                                        <button className="btn btn-primary" onClick={() => setFuncionSeleccionada(funcion)}>
                                            Seleccionar Asientos
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <p>No hay funciones disponibles para esta combinación.</p>
            )}

            {funcionSeleccionada && (
                <AsientoModal
                    idSala={funcionSeleccionada.sala.id_sala}
                    nombreSala={funcionSeleccionada.sala.nombre}
                    sede={funcionSeleccionada.sala.sede.distrito.nombre}
                    pelicula={funcionSeleccionada.pelicula.nombre}
                    idFuncion={funcionSeleccionada.id_funcion}
                    precio={funcionSeleccionada.precio}
                    onClose={() => setFuncionSeleccionada(null)}
                    agregarAsientosAlCarrito={(asientos) => agregarAsientosAlCarrito(funcionSeleccionada, asientos)}
                />
            )}

            {isModalOpen && (
                <ModalCarrito onClose={() => setIsModalOpen(false)} />
            )}
        </div>
    );
};

export default Boleteria;
