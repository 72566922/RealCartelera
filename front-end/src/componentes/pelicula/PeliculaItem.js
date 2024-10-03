// src/components/PeliculaItem.js
import React from "react";
import './style.css';

function PeliculaItem({ pelicula }) {
  return (
    <div className="pelicula-item card">
      <img src={pelicula.imagenUrl} alt={pelicula.nombre} className="pelicula-img card-img-top" />
      <div className="card-body">
        <h3 className="card-title">{pelicula.titulo}</h3>
        <p className="card-text">{pelicula.descripcion}</p>
        <p className="card-text"><strong>Fecha de Estreno:</strong> {pelicula.fechaEstreno}</p>
      </div>
    </div>
  );
}

export default PeliculaItem;
