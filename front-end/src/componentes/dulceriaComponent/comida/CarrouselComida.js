import React from 'react';

function CarruselComida({ comidas, currentIndex, handlePrev, handleNext, setCurrentIndex }) {
  // Comprueba si 'comidas' es un array válido y si tiene elementos.
  // Si no hay comidas disponibles, muestra un mensaje al usuario.
  if (!Array.isArray(comidas) || comidas.length === 0) {
    return <p>No hay comidas disponibles.</p>; // Mensaje si no hay comidas
  }

  return (
    <div className="carousel">
      <div className="carousel-inner">
        {/* Itera sobre el array de comidas y genera un 'carousel-item' por cada una */}
        {comidas.map((comida, index) => (
          // Cada elemento necesita una key única, se usa el id_comida como identificador
          <div key={comida.id_comida} className={`carousel-item ${index === currentIndex ? 'active' : ''}`}>
            {/* Contenedor de la imagen */}
            <div className="image-container">
              <img
                className="d-block w-100"
                // Muestra la imagen de la comida. El nombre de la comida es transformado en un formato de URL 
                // reemplazando espacios con guiones y convirtiéndolo a minúsculas
                src={`/imagenes/${comida.dulce.nombre.toLowerCase().replace(/\s+/g, '-')}.png`}
                alt={comida.dulce.nombre}
              />
            </div>
            {/* Información adicional sobre la comida, como nombre, gramos, precio y unidades */}
            <div className="carousel-caption d-block d-md-block">
              <h5>{comida.dulce.nombre}</h5>
              <p>{comida.gramos} Gramos - ${comida.precio}</p>
              <p>{comida.unidades} unidades</p>
            </div>
          </div>
        ))}
      </div>

      {/* Botón para navegar al ítem anterior */}
      <button className="carousel-control-prev" type="button" onClick={handlePrev} aria-label="Previous">
        <span className="carousel-control-icon">&lt;</span> {/* Ícono de control para ir al anterior */}
      </button>

      {/* Botón para navegar al siguiente ítem */}
      <button className="carousel-control-next" type="button" onClick={handleNext} aria-label="Next">
        <span className="carousel-control-icon">&gt;</span> {/* Ícono de control para ir al siguiente */}
      </button>

      {/* Indicadores de posición debajo del carrusel. Muestra un marcador para cada comida */}
      <div className="carousel-indicators">
        {comidas.map((_, index) => (
          // Cada indicador permite seleccionar directamente el ítem correspondiente en el carrusel
          <span
            key={index}
            className={`carousel-indicator ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)} // Al hacer clic, cambia el índice actual
            style={{
              backgroundColor: index === currentIndex ? 'blue' : 'gray', // Cambia el color según si está activo
              cursor: 'pointer', // Cambia el cursor a 'puntero' para indicar que es clicable
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default CarruselComida;
