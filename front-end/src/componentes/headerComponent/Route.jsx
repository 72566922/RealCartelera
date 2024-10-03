// RoutesComponent.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dulceria from '../dulceriaComponent/dulceria';
import InicioComponent from '../inicio/InicioComponent';
import PeliculaComponent from '../pelicula/PeliculaComponent';

function RoutesComponent({ bebidas, comidas, addToCartBebida, addToCartComida }) {
  return (
    <div>
      <div className="flex-grow-1">
        <Routes>
          <Route path="/" element={<InicioComponent />} />
          <Route path="/peliculas" element={<PeliculaComponent />} />
          <Route path="/dulceria" element={<Dulceria bebidas={bebidas} comidas={comidas} addToCartBebida={addToCartBebida} addToCartComida={addToCartComida} />} />
        </Routes>
      </div>
    </div>
  );
}

export default RoutesComponent;
