// src/components/Carrusel.js
import React, { useState, useEffect } from "react";

function Carrusel({ items }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Efecto para mover el carrusel automáticamente
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === items.length - 1 ? 0 : prevIndex + 1));
    }, 750); // Cambiar cada 0.75 segundos

    return () => clearInterval(intervalId); // Limpiar el intervalo al desmontar el componente
  }, [items.length]);

  if (!Array.isArray(items) || items.length === 0) {
    return <p>No hay elementos disponibles.</p>; // Mensaje si no hay elementos
  }

  return (
    <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        {items.map((item, index) => (
          <div key={item.id} className={`carousel-item ${index === currentIndex ? 'active' : ''}`}>
            <div className="image-container" style={{ height: '200px', overflow: 'hidden' }}> {/* Ajusta la altura aquí */}
              <img
                className="d-block w-100"
                src={`/imagenes/${item.nombre.toLowerCase().replace(/\s+/g, '-')}.png`}
                alt={item.nombre}
                style={{ height: '100%', width: 'auto', objectFit: 'contain' }} // Ajusta el tamaño según sea necesario
              />
            </div>
          </div>
        ))}
      </div>

      {/* Comentado: Eliminar flechas de navegación
      <button className="carousel-control-prev" type="button" onClick={handlePrev} aria-label="Previous">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      </button>

      <button className="carousel-control-next" type="button" onClick={handleNext} aria-label="Next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
      </button>
      */}

      <div className="carousel-indicators">
        {items.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`carousel-indicator ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
            style={{
              backgroundColor: index === currentIndex ? 'blue' : 'gray',
              cursor: 'pointer',
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default Carrusel;
