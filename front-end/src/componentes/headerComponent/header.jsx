// src/componentes/Header.js
import React, { useState } from "react";
import '../headerComponent/styleHeader/header.css'
import Modal from "./Modal"; // Importar el componente Modal

function Header({ cartItems, handleSell }) {
  const [showModal, setShowModal] = useState(false);

  const handleModalToggle = () => {
    setShowModal(!showModal);
  };

  return (
    <header className="bg-custom text-dark text-center p-3 d-flex flex-column">
      <nav className="d-flex flex-column flex-md-row justify-content-between align-items-center">
        <ul className="list-unstyled d-flex flex-wrap justify-content-center mb-0">
          <li className="me-3">login</li>
          <li className="me-3">mapa</li>
          <li className="me-3">tiempo</li>
        </ul>
        <button className="btn btn-light mt-2 mt-md-0" onClick={handleModalToggle}>
          Carrito de Compras ({cartItems.length})
        </button>
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
