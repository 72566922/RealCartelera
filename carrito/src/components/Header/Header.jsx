import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ModalCarrito from "../ModalCarrito";

function Header() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [usuarioId, setUsuarioId] = useState(null);
    const [usuarioGmail, setUsuarioGmail] = useState(null);

    useEffect(() => {
        const storedUsuarioId = localStorage.getItem('usuarioId');
        const storedUsuarioGmail = localStorage.getItem('usuarioGmail');
        
        if (storedUsuarioId && storedUsuarioGmail) {
            setUsuarioId(storedUsuarioId);
            setUsuarioGmail(storedUsuarioGmail);
        }
    }, []);

    const abrirModal = () => {
        setIsModalOpen(true);
    };

    const cerrarModal = () => {
        setIsModalOpen(false);
    };

    const cerrarSesion = () => {
        localStorage.removeItem('usuarioId');
        localStorage.removeItem('usuarioGmail');
        setUsuarioId(null);
        setUsuarioGmail(null);
        window.location.reload(); // Recarga la página para actualizar el estado de sesión
    };

    return (
        <div>
            <header>
                <nav>
                    <ul>
                        <li><Link to={"/"}>INICIO</Link></li>
                        <li><Link to={"/pelicula"}>PELICULA</Link></li>
                        <li><Link to={"/dulceria"}>DULCERIA</Link></li>
                        <li><Link to={"/register"}>LOGIN</Link></li>
                        <li><button onClick={abrirModal}>Ver Carrito</button></li>
                    </ul>
                </nav>

                {usuarioGmail && usuarioId && (
                    <div>
                        <p>Usuario: {usuarioGmail}</p>
                        <p>ID: {usuarioId}</p>
                        <button onClick={cerrarSesion}>Cerrar sesión</button> {/* Botón de cerrar sesión */}
                    </div>
                )}

                <ModalCarrito isOpen={isModalOpen} onClose={cerrarModal} />
            </header>
        </div>
    );
}

export default Header;
