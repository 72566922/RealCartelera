// PeliculaItem.js
import React from "react";
import { Link } from 'react-router-dom';
import './style.css';

function PeliculaItem({ pelicula }) {
  return (
    <div className="pelicula-item card">
      <Link to={`/comprarBoleto/${pelicula.id_pelicula}`} aria-label={`Comprar boleto para ${pelicula.titulo}`}>
        <img src={pelicula.imagenUrl} alt={pelicula.nombre} className="pelicula-img card-img-top" />
      </Link>
      <div className="card-body">
        <h3 className="card-title">{pelicula.titulo}</h3>
        <p className="card-text">{pelicula.descripcion}</p>
        <p className="card-text"><strong>Fecha de Estreno:</strong> {pelicula.fechaEstreno}</p>
      </div>
    </div>
  );
}

export default PeliculaItem;
