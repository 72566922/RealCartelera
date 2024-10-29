import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import FuncionService from "../../service/FuncionService";
import { useCarrito } from '../context/CarritoContext';
import ModalCarrito from '../ModalCarrito';
import AsientoModal from './AsientoModal';

const Boleteria = () => {
    // Obtener la información de la ubicación actual de la ruta.
    const location = useLocation();
    // Obtener la película seleccionada de la navegación de estado.
    const peliculaSeleccionada = location.state?.pelicula;

    // Estados para almacenar las funciones, horas, sedes, etc.
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
                console.log("Cargando funciones...");
                // Llamada al servicio para obtener todas las funciones
                const funcionesResponse = await FuncionService.getAllFunciones();
                const funcionesData = funcionesResponse.data || [];
                setFunciones(funcionesData);
                console.log("Funciones cargadas:", funcionesData);

                // Filtrar funciones que correspondan a la película seleccionada
                const funcionesFiltradasPorPelicula = funcionesData.filter(
                    funcion => funcion.pelicula.id_pelicula === peliculaSeleccionada.id_pelicula
                );

                // Obtener horas y sedes únicas para los selectores
                const horasUnicas = [...new Set(funcionesFiltradasPorPelicula.map(funcion => funcion.hora))];
                const sedesUnicas = [...new Set(funcionesFiltradasPorPelicula.map(funcion => funcion.sala.sede.distrito.nombre))];

                setHorasDisponibles(horasUnicas);
                setSedesDisponibles(sedesUnicas);
                console.log("Horas disponibles:", horasUnicas);
                console.log("Sedes disponibles:", sedesUnicas);
            } catch (err) {
                setError("Error al cargar funciones");
                console.error("Error al cargar funciones:", err);
            }
        };

        if (peliculaSeleccionada) {
            fetchFunciones();
        }
    }, [peliculaSeleccionada]);

    // Efecto para actualizar sedes disponibles cuando cambia la hora seleccionada
    useEffect(() => {
        console.log("Hora seleccionada:", selectedHora);
        if (selectedHora) {
            const funcionesFiltradasPorHora = funciones.filter(
                funcion => funcion.hora === selectedHora && funcion.pelicula.id_pelicula === peliculaSeleccionada.id_pelicula
            );
            const sedesFiltradasPorHora = [...new Set(funcionesFiltradasPorHora.map(funcion => funcion.sala.sede.distrito.nombre))];
            setSedesDisponibles(sedesFiltradasPorHora);
            console.log("Sedes filtradas por hora:", sedesFiltradasPorHora);
        } else {
            const funcionesFiltradasPorPelicula = funciones.filter(
                funcion => funcion.pelicula.id_pelicula === peliculaSeleccionada.id_pelicula
            );
            const sedesUnicas = [...new Set(funcionesFiltradasPorPelicula.map(funcion => funcion.sala.sede.distrito.nombre))];
            setSedesDisponibles(sedesUnicas);
            console.log("Sedes disponibles sin filtro de hora:", sedesUnicas);
        }
    }, [selectedHora, funciones, peliculaSeleccionada]);

    // Efecto para actualizar horas disponibles cuando cambia la sede seleccionada
    useEffect(() => {
        console.log("Sede seleccionada:", selectedSede);
        if (selectedSede) {
            const funcionesFiltradasPorSede = funciones.filter(
                funcion => funcion.sala.sede.distrito.nombre === selectedSede && funcion.pelicula.id_pelicula === peliculaSeleccionada.id_pelicula
            );
            const horasFiltradasPorSede = [...new Set(funcionesFiltradasPorSede.map(funcion => funcion.hora))];
            setHorasDisponibles(horasFiltradasPorSede);
            console.log("Horas filtradas por sede:", horasFiltradasPorSede);
        } else {
            const funcionesFiltradasPorPelicula = funciones.filter(
                funcion => funcion.pelicula.id_pelicula === peliculaSeleccionada.id_pelicula
            );
            const horasUnicas = [...new Set(funcionesFiltradasPorPelicula.map(funcion => funcion.hora))];
            setHorasDisponibles(horasUnicas);
            console.log("Horas disponibles sin filtro de sede:", horasUnicas);
        }
    }, [selectedSede, funciones, peliculaSeleccionada]);

    // Función para agregar asientos seleccionados al carrito
    const agregarAsientosAlCarrito = (funcion, asientos) => {
        console.log("Agregando asientos al carrito para la función:", funcion, "con asientos:", asientos);
        if (!funcion.precio) {
            console.error("Precio no definido para la función:", funcion);
            return;
        }

        if (asientos.length === 0) {
            console.error("No se han seleccionado asientos");
            return;
        }

        const funcionConDatos = {
            id: funcion.id_funcion,
            nombre: funcion.pelicula.nombre,
            precio: funcion.precio,
            sala: funcion.sala.nombre,
            sede: funcion.sala.sede.distrito.nombre,
            hora: funcion.hora,
            asientos: asientos.map(asiento => ({
                id_asiento: asiento.id_asiento,
                id_funcion: funcion.id_funcion
            }))
        };

        agregarAlCarritoFunciones(funcionConDatos);
        setIsModalOpen(true);
        setFuncionSeleccionada(funcion);
        console.log("Función agregada al carrito:", funcionConDatos);
    };

    // Filtrar funciones según los filtros seleccionados
    const filteredFunciones = funciones.filter(funcion => {
        return (
            (!selectedHora || funcion.hora === selectedHora) &&
            (!selectedSede || funcion.sala.sede.distrito.nombre === selectedSede) &&
            (peliculaSeleccionada ? funcion.pelicula.id_pelicula === peliculaSeleccionada.id_pelicula : true)
        );
    });

    console.log("Funciones disponibles después del filtrado:", filteredFunciones);

    return (
        <div>
            <h1>Funciones Disponibles</h1>
            {error && <div>{error}</div>}
            {/* Select para seleccionar la hora */}
            <select value={selectedHora} onChange={(e) => setSelectedHora(e.target.value)}>
                <option value="">Seleccionar Hora</option>
                {horasDisponibles.map((hora) => (
                    <option key={hora} value={hora}>{hora}</option>
                ))}
            </select>

            {/* Select para seleccionar la sede */}
            <select value={selectedSede} onChange={(e) => setSelectedSede(e.target.value)}>
                <option value="">Seleccionar Sede</option>
                {sedesDisponibles.map((sede) => (
                    <option key={sede} value={sede}>{sede}</option>
                ))}
            </select>

            {filteredFunciones.length > 0 ? (
                <div>
                    <h2>Funciones Disponibles:</h2>
                    {filteredFunciones.map(funcion => (
                        <div key={funcion.id_funcion}>
                            <h3>{funcion.pelicula.nombre} - {funcion.sala.nombre}</h3>
                            <p>Hora: {funcion.hora} - Precio: {funcion.precio}</p>
                            <button onClick={() => setFuncionSeleccionada(funcion)}>
                                Seleccionar Asientos
                            </button>
                        </div>
                    ))}
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
