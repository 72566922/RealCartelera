// RoutesComponent.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dulceria from '../dulceriaComponent/dulceria';
import '../headerComponent/styleHeader/route.css';

function RoutesComponent({ bebidas, comidas, addToCartBebida, addToCartComida }) {
  return (
    <div className="container">
      <div className="flex-grow-1">
        <Routes>
          <Route path="/dulceria" element={<Dulceria bebidas={bebidas} comidas={comidas} addToCartBebida={addToCartBebida} addToCartComida={addToCartComida} />} />
        </Routes>
      </div>
    </div>
  );
}

export default RoutesComponent;
