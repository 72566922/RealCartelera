import React, { useState } from 'react';
import {BrowserRouter as Router } from 'react-router-dom';
import { CarritoProvider } from './components/context/CarritoContext';
import RoutesComponent from './routes/RouteComponent';
import ModalCarrito from './components/ModalCarrito';
import Header from './components/Header/Header';

function App() {
  const [isModalOpen, setModalOpen] = useState(false);

  const abrirModal = () => setModalOpen(true);
  const cerrarModal = () => setModalOpen(false);

  return (
    <CarritoProvider>
      <Router>
      <div className="App">
        <Header />
        <ModalCarrito isOpen={isModalOpen} onClose={cerrarModal} />
        <RoutesComponent abrirModal={abrirModal}/>
      </div>
      </Router>
    </CarritoProvider>
  );
}

export default App;
