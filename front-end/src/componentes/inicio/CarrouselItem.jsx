import React from "react";

function CarruselItem({ pelicula, active }) {
  return (
    <div className={`carousel-item ${active ? 'active' : ''}`}>
      <div className="carrusel-img-container">
        <img
          src={pelicula.imagenUrl}
          className="d-block mx-auto carrusel-img"
          alt={pelicula.nombre} // Ajusta el tamaño según sea necesario
        />
      </div>
      <div className="carousel-caption d-none d-md-block">
        <h5>{pelicula.nombre}</h5>
        <p>{pelicula.descripcion}</p>
      </div>
    </div>
  );
}

export default CarruselItem;
