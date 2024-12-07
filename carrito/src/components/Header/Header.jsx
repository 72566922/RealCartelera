import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ModalCarrito from "../ModalCarrito";
import { useAuth } from '../usuario/AuthContext';
import { useCarrito } from '../context/CarritoContext';
import Temporizador from "./Temporizador";
import { FaShoppingCart } from 'react-icons/fa';
import "./style.css";


function Header({ showModal }) {
    // Estados para controlar la visibilidad del modal y la lógica del temporizador
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [mostrarTemporizador, setMostrarTemporizador] = useState(false);
    const [temporizadorPausado, setTemporizadorPausado] = useState(false);
    const duracionTemporizador = 240; // Duración del temporizador en segundos

    // Desestructuración del contexto de autenticación y carrito
    const { usuarioId, usuarioGmail, logout } = useAuth();
    const { carritoDulceria, carritoFunciones, carritoBoletos } = useCarrito();

    // Funciones para abrir y cerrar el modal
    const abrirModal = () => setIsModalOpen(true);
    const cerrarModal = () => setIsModalOpen(false);

    // Función para cerrar sesión
    const cerrarSesion = () => logout();

    // useEffect para controlar el temporizador y la visibilidad en función de los artículos en el carrito
    useEffect(() => {
        // Verifica si hay artículos en el carrito
        const tieneItemsEnCarrito = carritoDulceria.length > 0 || carritoFunciones.length > 0 || carritoBoletos.length > 0;

        // Muestra el temporizador solo si hay artículos en el carrito
        if (tieneItemsEnCarrito) {
            setMostrarTemporizador(true);
            setTemporizadorPausado(isModalOpen); // Pausa el temporizador si el modal está abierto
        } else {
            setMostrarTemporizador(false);
            setTemporizadorPausado(true); // Pausa el temporizador si no hay artículos en el carrito
        }
    }, [carritoDulceria, carritoFunciones, carritoBoletos, isModalOpen]); // Se ejecuta cuando cambian los artículos del carrito o la visibilidad del modal

    return (
        <header className="text-dark p-3">
            {/* Barra de navegación */}
            <nav className="navbar navbar-expand-lg navbar-dark container-fluid">
                <Link className="navbar-brand" to="/">INICIO</Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    {/* Enlaces de navegación */}
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/pelicula">PELICULA</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/dulceria">DULCERIA</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">LOGIN</Link>
                        </li>
                    </ul>
                    {/* Sección para el carrito y el usuario */}
                    <ul className="navbar-nav ms-auto">
                        {/* Botón del carrito de compras */}
                        <li className="nav-item d-flex align-items-center">
                            <button className="btn btn-outline-light me-2" onClick={abrirModal}><FaShoppingCart /></button>
                            {/* Muestra el temporizador solo si hay artículos en el carrito */}
                            {mostrarTemporizador && (
                                <Temporizador
                                    duracion={duracionTemporizador} // Duración en segundos
                                    pausar={temporizadorPausado} // Pausar si el modal está abierto
                                />
                            )}
                        </li>
                        {/* Información del usuario si está logueado */}
                        {usuarioGmail && usuarioId && (
                            <li className="nav-item text-end">
                                <div className="text-light">
                                    <p className="mb-1">User: {usuarioGmail}</p>
                                    <button className="btn btn-danger btn-sm" onClick={cerrarSesion}>Cerrar sesión</button>
                                </div>
                            </li>
                        )}
                    </ul>
                </div>
            </nav>

            {/* Modal del carrito */}
            <ModalCarrito isOpen={isModalOpen} onClose={cerrarModal} />
        </header>
    );
}

export default Header;
