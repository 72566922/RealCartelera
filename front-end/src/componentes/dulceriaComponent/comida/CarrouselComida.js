import React from 'react';

function CarruselComida({ comidas, currentIndex, handlePrev, handleNext, setCurrentIndex }) {
  if (!Array.isArray(comidas) || comidas.length === 0) {
    return <p>No hay comidas disponibles.</p>; // Mensaje si no hay comidas
  }

  return (
    <div className="carousel">
      <div className="carousel-inner">
        {comidas.map((comida, index) => (
          <div key={comida.id_comida} className={`carousel-item ${index === currentIndex ? 'active' : ''}`}>
            <div className="image-container">
              <img
                className="d-block w-100"
                src={`/imagenes/${comida.dulce.nombre.toLowerCase().replace(/\s+/g, '-')}.png`}
                alt={comida.dulce.nombre}
              />
            </div>
            <div className="carousel-caption d-block d-md-block">
              <h5>{comida.dulce.nombre}</h5>
              <p>{comida.gramos} Gramos - ${comida.precio}</p>
              <p>{comida.unidades} unidades</p>
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
        {comidas.map((_, index) => (
          <span
            key={index}
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

export default CarruselComida;
