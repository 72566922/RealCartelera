import React from 'react';
import '../styleDulceria/bebidaSelector.css';

function CarruselBebida({ bebidas, currentIndex, handlePrev, handleNext, setCurrentIndex }) {
  if (bebidas.length === 0) {
    return <p>No hay bebidas disponibles.</p>; // Mensaje si no hay bebidas
  }

  return (
    <div className="carousel">
      <div className="carousel-inner">
        {bebidas.map((bebida, index) => (
          <div
            key={bebida.id_bebida}
            className={`carousel-item ${index === currentIndex ? 'active' : ''}`}
          >
            <div className="image-container">
              <img
                className="d-block w-100"
                src={`/imagenes/${bebida.dulce.nombre.toLowerCase().replace(/\s+/g, '-')}.png`}
                alt={bebida.dulce.nombre}
              />
            </div>
            <div className="carousel-caption d-block d-md-block">
              <h5>{bebida.dulce.nombre}</h5>
              <p>{bebida.litros} Litros - ${bebida.precio}</p>
              <p>{bebida.unidades} unidades</p>
            </div>
          </div>
        ))}
      </div>

      <button className="carousel-control-prev" type="button" onClick={handlePrev} aria-label="Previous">
        <span className="carousel-control-icon">&lt;</span>
      </button>

      <button className="carousel-control-next" type="button" onClick={handleNext} aria-label="Next">
        <span className="carousel-control-icon">&gt;</span>
      </button>

      <div className="carousel-indicators">
        {bebidas.map((_, index) => (
          <span
            key={index}
            className={`carousel-indicator ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
            style={{
              backgroundColor: index === currentIndex ? 'blue' : 'gray',
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default CarruselBebida;
