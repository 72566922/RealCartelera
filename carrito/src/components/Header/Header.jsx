import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ModalCarrito from "../ModalCarrito";
import { useAuth } from '../usuario/AuthContext';
import { useCarrito } from '../context/CarritoContext'; 
import Temporizador from "./Temporizador";
import "./style.css";

function Header({ showModal }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { usuarioId, usuarioGmail, logout } = useAuth();
    const { carritoDulceria, carritoFunciones, carritoBoletos } = useCarrito();
    const [mostrarTemporizador, setMostrarTemporizador] = useState(false);
    const [temporizadorPausado, setTemporizadorPausado] = useState(false);
    const duracionTemporizador = 240;

    const abrirModal = () => setIsModalOpen(true);
    const cerrarModal = () => setIsModalOpen(false);
    const cerrarSesion = () => logout();

    useEffect(() => {
        const tieneItemsEnCarrito = carritoDulceria.length > 0 || carritoFunciones.length > 0 || carritoBoletos.length > 0;

        // Muestra el temporizador si hay artículos en el carrito
        if (tieneItemsEnCarrito) {
            setMostrarTemporizador(true);
            setTemporizadorPausado(isModalOpen); // Pausar si el modal está abierto
        } else {
            setMostrarTemporizador(false);
            setTemporizadorPausado(true);
        }
    }, [carritoDulceria, carritoFunciones, carritoBoletos, isModalOpen]); // Añadir `isModalOpen` como dependencia

    return (
        <header className="text-dark p-3">
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
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <button className="btn btn-outline-light me-3" onClick={abrirModal}>Ver Carrito</button>
                            {mostrarTemporizador && (
                                <Temporizador 
                                    duracion={duracionTemporizador} 
                                    pausar={temporizadorPausado} 
                                />
                            )}
                        </li>
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

            <ModalCarrito isOpen={isModalOpen} onClose={cerrarModal} />
        </header>
    );
}

export default Header;
