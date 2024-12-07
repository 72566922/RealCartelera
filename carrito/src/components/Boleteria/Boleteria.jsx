import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // Para obtener el estado de la ruta actual
import FuncionService from "../../service/FuncionService"; // Servicio para obtener las funciones
import { useCarrito } from '../context/CarritoContext'; // Contexto para gestionar el carrito
import ModalCarrito from '../ModalCarrito'; // Componente para mostrar el carrito
import AsientoModal from './AsientoModal'; // Componente para seleccionar asientos

const Boleteria = () => {
    const location = useLocation(); // Obtener la ubicación actual para acceder al estado pasado en la ruta
    const peliculaSeleccionada = location.state?.pelicula; // Obtener la película seleccionada desde el estado

    // Estado para gestionar funciones, horas, sedes y errores
    const [funciones, setFunciones] = useState([]);
    const [horasDisponibles, setHorasDisponibles] = useState([]);
    const [sedesDisponibles, setSedesDisponibles] = useState([]);
    const [selectedHora, setSelectedHora] = useState('');
    const [selectedSede, setSelectedSede] = useState('');
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false); // Para controlar la apertura del modal del carrito
    const [funcionSeleccionada, setFuncionSeleccionada] = useState(null); // Para gestionar la función seleccionada
    const { agregarAlCarritoFunciones } = useCarrito(); // Función para agregar funciones al carrito

    // useEffect para cargar las funciones al inicio
    useEffect(() => {
        const fetchFunciones = async () => {
            try {
                // Solicitar las funciones disponibles
                const funcionesResponse = await FuncionService.getAllFunciones();
                const funcionesData = funcionesResponse.data || [];

                // Filtrar las funciones para la película seleccionada
                const funcionesFiltradasPorPelicula = funcionesData.filter(
                    funcion => funcion.pelicula.id_pelicula === peliculaSeleccionada.id_pelicula
                );
                setFunciones(funcionesFiltradasPorPelicula); // Actualizar el estado con las funciones filtradas

                // Extraer las horas y sedes únicas disponibles para la película seleccionada
                const horasUnicas = [...new Set(funcionesFiltradasPorPelicula.map(funcion => funcion.hora))];
                const sedesUnicas = [...new Set(funcionesFiltradasPorPelicula.map(funcion => funcion.sala.sede.distrito.nombre))];

                setHorasDisponibles(horasUnicas); // Establecer las horas disponibles
                setSedesDisponibles(sedesUnicas); // Establecer las sedes disponibles
            } catch (err) {
                setError("Error al cargar funciones"); // Manejo de errores
            }
        };

        // Si hay una película seleccionada, se cargan las funciones
        if (peliculaSeleccionada) {
            fetchFunciones();
        }
    }, [peliculaSeleccionada]); // Este efecto se ejecuta cada vez que cambia la película seleccionada

    // useEffect para actualizar las sedes al cambiar la hora seleccionada
    useEffect(() => {
        if (selectedHora) {
            const funcionesFiltradasPorHora = funciones.filter(
                funcion => funcion.hora === selectedHora
            );
            const sedesFiltradasPorHora = [...new Set(funcionesFiltradasPorHora.map(funcion => funcion.sala.sede.distrito.nombre))];
            setSedesDisponibles(sedesFiltradasPorHora); // Actualizar las sedes disponibles según la hora seleccionada
        } else {
            // Si no se selecciona hora, mostrar todas las sedes
            const todasSedes = [...new Set(funciones.map(funcion => funcion.sala.sede.distrito.nombre))];
            setSedesDisponibles(todasSedes);
        }
    }, [selectedHora, funciones]); // Este efecto se ejecuta cada vez que cambia la hora o las funciones

    // useEffect para actualizar las horas al cambiar la sede seleccionada
    useEffect(() => {
        if (selectedSede) {
            const funcionesFiltradasPorSede = funciones.filter(
                funcion => funcion.sala.sede.distrito.nombre === selectedSede
            );
            const horasFiltradasPorSede = [...new Set(funcionesFiltradasPorSede.map(funcion => funcion.hora))];
            setHorasDisponibles(horasFiltradasPorSede); // Actualizar las horas disponibles según la sede seleccionada
        } else {
            // Si no se selecciona sede, mostrar todas las horas
            const todasHoras = [...new Set(funciones.map(funcion => funcion.hora))];
            setHorasDisponibles(todasHoras);
        }
    }, [selectedSede, funciones]); // Este efecto se ejecuta cada vez que cambia la sede o las funciones

    // Función para agregar los asientos al carrito
    const agregarAsientosAlCarrito = (funcion, asientos) => {
        console.log("Funcion:", funcion); // Mostrar detalles de la función seleccionada
        console.log("Asientos seleccionados:", asientos); // Mostrar los asientos seleccionados
        console.log("Precio de la función:", funcion.precio); // Mostrar el precio de la función

        if (!funcion.precio || asientos.length === 0) return; // Validar que haya precio y asientos seleccionados

        // Crear el objeto de la función con los datos necesarios
        const funcionConDatos = {
            id: funcion.id_funcion,
            nombre: funcion.pelicula.nombre,
            precio: 0, // Inicializar el precio en 0
            sala: funcion.sala.nombre,
            sede: funcion.sala.sede.distrito.nombre,
            hora: funcion.hora
        };

        agregarAlCarritoFunciones(funcionConDatos); // Agregar la función al carrito
        setIsModalOpen(true); // Abrir el modal del carrito
        setFuncionSeleccionada(funcion); // Establecer la función seleccionada
    };

    // Filtrar las funciones según la hora y la sede seleccionadas
    const filteredFunciones = funciones.filter(funcion => {
        return (
            (!selectedHora || funcion.hora === selectedHora) &&
            (!selectedSede || funcion.sala.sede.distrito.nombre === selectedSede)
        );
    });

    return (
        <div className="container">
            <h1>Funciones Disponibles</h1>
            {error && <div className="alert alert-danger">{error}</div>} {/* Mostrar mensaje de error si existe */}

            {/* Selección de hora */}
            <div className="mb-3">
                <label htmlFor="horaSelect" className="form-label">Seleccionar Hora</label>
                <select id="horaSelect" className="form-select" value={selectedHora} onChange={(e) => setSelectedHora(e.target.value)}>
                    <option value="">Seleccionar Todas las Horas</option>
                    {horasDisponibles.map((hora) => (
                        <option key={hora} value={hora}>{hora}</option>
                    ))}
                </select>
            </div>

            {/* Selección de sede */}
            <div className="mb-3">
                <label htmlFor="sedeSelect" className="form-label">Seleccionar Sede</label>
                <select id="sedeSelect" className="form-select" value={selectedSede} onChange={(e) => setSelectedSede(e.target.value)}>
                    <option value="">Seleccionar Todas las Sedes</option>
                    {sedesDisponibles.map((sede) => (
                        <option key={sede} value={sede}>{sede}</option>
                    ))}
                </select>
            </div>

            {/* Mostrar las funciones filtradas */}
            {filteredFunciones.length > 0 ? (
                <div>
                    <h2>Funciones Disponibles:</h2>
                    <div className="row">
                        {filteredFunciones.map(funcion => (
                            <div className="col-md-4 mb-3" key={funcion.id_funcion}>
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">{funcion.pelicula.nombre} - {funcion.sala.nombre}</h5>
                                        <p className="card-text">Fecha: {funcion.fecha} - Hora: {funcion.hora} - Precio: $/. {funcion.precio}</p>
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

            {/* Modal para seleccionar asientos */}
            {funcionSeleccionada && (
                <AsientoModal
                    idSala={funcionSeleccionada.sala.id_sala}
                    nombreSala={funcionSeleccionada.sala.nombre}
                    sede={funcionSeleccionada.sala.sede.distrito.nombre}
                    pelicula={funcionSeleccionada.pelicula.nombre}
                    idFuncion={funcionSeleccionada.id_funcion}
                    precio={funcionSeleccionada.precio}
                    onClose={() => setFuncionSeleccionada(null)} // Cerrar el modal
                    agregarAsientosAlCarrito={(asientos) => agregarAsientosAlCarrito(funcionSeleccionada, asientos)} // Pasar la función para agregar asientos al carrito
                />
            )}

            {/* Modal del carrito */}
            <ModalCarrito
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)} // Cerrar el modal
            />
        </div>
    );
};

export default Boleteria;
