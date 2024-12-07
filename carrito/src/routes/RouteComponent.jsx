// Importamos React y los componentes necesarios para definir las rutas
import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Utilizamos Routes y Route de react-router-dom para la navegación entre páginas
import Dulceria from '../components/Dulceria/Dulceria'; // Componente para la página de Dulcería
import Boleteria from '../components/Boleteria/Boleteria'; // Componente para la página de Boletería
import InicioComponent from "../components/Inicio/InicioComponent"; // Componente para la página de inicio
import Peliculas from '../components/Pelicula/Peliculas'; // Componente para la página de Películas
import RegistroUsuario from '../components/usuario/RegistroUsuario'; // Componente para el registro de usuario
import Login from '../components/usuario/Login'; // Componente para el login de usuario

// Definimos el componente RoutesComponent que gestiona las rutas de la aplicación
function RoutesComponent() {
  return (
    <div>
      {/* Un div contenedor con la clase 'flex-grow-1' para asegurar que ocupe el espacio disponible */}
      <div className="flex-grow-1">
        {/* Utilizamos el componente Routes para definir todas las rutas de la aplicación */}
        <Routes>
          {/* Definimos las rutas con el componente Route */}
          {/* La ruta raíz ("/") renderiza el componente InicioComponent */}
          <Route path="/" element={<InicioComponent />} />
          
          {/* Ruta para la página de Dulcería */}
          <Route path="/dulceria" element={<Dulceria  />} />
          
          {/* Ruta para la página de Boletería */}
          <Route path="/boleteria" element={<Boleteria  />} />
          
          {/* Ruta para la página de Películas */}
          <Route path="/pelicula" element={<Peliculas  />} />
          
          {/* Ruta para la página de Registro de Usuario */}
          <Route path="/register" element={<RegistroUsuario  />} />
          
          {/* Ruta para la página de Login de Usuario */}
          <Route path="/login" element={<Login  />} />
        </Routes>
      </div>
    </div>
  );
}

// Exportamos el componente RoutesComponent para que pueda ser utilizado en otras partes de la aplicación
export default RoutesComponent;
