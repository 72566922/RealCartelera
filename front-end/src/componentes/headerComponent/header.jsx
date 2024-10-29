// src/componentes/Header.js
import React, { useState } from "react";
import '../headerComponent/styleHeader/header.css';
import Modal from "./Modal"; // Importar el componente Modal
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';

function Header({ cartItems, handleSell }) {
  const [showModal, setShowModal] = useState(false);

  const handleModalToggle = () => {
    setShowModal(!showModal);
  };

  return (
    <header className="bg-custom text-dark text-center d-flex flex-column">
      <nav className="navbar navbar-expand-md navbar-light bg-custom w-100">
        <div className="container-fluid">
          {/* Logo usando Link de react-router-dom */}
          <Link to="/" className="navbar-brand">
            <img src="/logo192.png" alt="Logo" className="img-fluid" style={{ width: '30px' }} /> {/* Ajustar tamaño del logo */}
          </Link>

          {/* Botón de menú hamburguesa para pantallas pequeñas */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Opciones del menú */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <div className="cont">
              <ul className="navbar-nav mx-auto mb-2 mb-md-0">
                <li className="nav-item">
                  <Link to="/login" className="nav-link small">Login</Link> {/* Clase small para reducir tamaño */}
                </li>
                <li className="nav-item">
                  <Link to="/dulceria" className="nav-link small">MAPA</Link> {/* Clase small para reducir tamaño */}
                </li>
                <li className="nav-item">
                  <Link to="/dulceria" className="nav-link small">TIEMPO</Link> {/* Clase small para reducir tamaño */}
                </li>
              </ul>
            </div>

            {/* Botón del carrito de compras */}
            <button className="btn btn-light btn-sm" onClick={handleModalToggle}> {/* Clase btn-sm para botón más pequeño */}
              <FaShoppingCart /> ({cartItems.length}) {/* Mensaje más corto */}
            </button>
          </div>
        </div>
      </nav>

      {/* Mostrar el Modal */}
      <Modal
        showModal={showModal}
        handleModalToggle={handleModalToggle}
        cartItems={cartItems}
        handleSell={handleSell}
      />
    </header>
  );
}

export default Header;
