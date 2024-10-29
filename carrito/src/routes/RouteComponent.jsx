// RoutesComponent
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dulceria from '../components/Dulceria/Dulceria';
import Boleteria from '../components/Boleteria/Boleteria';
import InicioComponent from "../components/Inicio/InicioComponent";
import Peliculas from '../components/Pelicula/Peliculas';
import RegistroUsuario from '../components/usuario/RegistroUsuario';
import Login from '../components/usuario/Login';

function RoutesComponent() {
  return (
    <div>
      <div className="flex-grow-1">
        <Routes>
          <Route path="/" element={<InicioComponent />} />
          <Route path="/dulceria" element={<Dulceria  />} />
          <Route path="/boleteria" element={<Boleteria  />} />
          <Route path="/pelicula" element={<Peliculas  />} />
          <Route path="/register" element={<RegistroUsuario  />} />
          <Route path="/login" element={<Login  />} />
        </Routes>
      </div>
    </div>
  );
}

export default RoutesComponent;
