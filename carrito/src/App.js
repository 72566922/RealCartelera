import React, { useState } from 'react';
import {BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './components/usuario/AuthContext'; 
import { CarritoProvider } from './components/context/CarritoContext';
import RoutesComponent from './routes/RouteComponent';
import ModalCarrito from './components/ModalCarrito';
import Header from './components/Header/Header';
import "./App.css";

function App() {
  const [isModalOpen, setModalOpen] = useState(false);

  const abrirModal = () => setModalOpen(true);
  const cerrarModal = () => setModalOpen(false);

  return (
    <AuthProvider>
      <CarritoProvider>
      <Router>
      <div className="App">
        <Header />
        <ModalCarrito isOpen={isModalOpen} onClose={cerrarModal} />
        <RoutesComponent abrirModal={abrirModal}/>
      </div>
      </Router>
    </CarritoProvider>
    </AuthProvider>
  );
}

export default App;
