import React, { useState, useEffect } from "react";

function ComidaSelector({ comidas, setComidaSeleccionada }) {
  // Estado para rastrear el índice actual del carrusel
  const [currentIndex, setCurrentIndex] = useState(0);

  // Efecto que se ejecuta cada vez que cambia el índice actual o la lista de comidas
  useEffect(() => {
    if (Array.isArray(comidas) && comidas.length > 0) {
      setComidaSeleccionada(comidas[currentIndex]); // Establece la comida seleccionada
      console.log("Comida seleccionada automáticamente:", comidas[currentIndex]); // Imprimir comida seleccionada
    } else {
      setComidaSeleccionada(null); // Limpia la selección si no hay comidas
    }
  }, [currentIndex, comidas, setComidaSeleccionada]);

  // Función para manejar el clic en el botón "Anterior"
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? comidas.length - 1 : prevIndex - 1)); // Mueve al índice anterior
  };

  // Función para manejar el clic en el botón "Siguiente"
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === comidas.length - 1 ? 0 : prevIndex + 1)); // Mueve al índice siguiente
  };

  // Verifica si hay comidas disponibles, si no, muestra un mensaje
  if (!Array.isArray(comidas) || comidas.length === 0) {
    return <p>No hay comidas disponibles.</p>; // Mensaje si no hay comidas
  }

  return (
    <div className="carousel">
      <div className="carousel-inner">
        {/* Mapea a través de las comidas y genera los elementos del carrusel */}
        {comidas.map((comida, index) => (
          <div key={comida.id_comida} className={`carousel-item ${index === currentIndex ? 'active' : ''}`}>
            <div className="image-container">
              <img
                className="d-block w-100"
                src={`/imagenes/${comida.dulce.nombre.toLowerCase().replace(/\s+/g, '-')}.png`} // Ruta de la imagen
                alt={comida.dulce.nombre}
              />
            </div>
            <div className="carousel-caption d-block d-md-block">
              <h5>{comida.dulce.nombre}</h5> Nombre de la comida
              <p>{comida.gramos} Gramos - ${comida.precio}</p> Gramos y precio
              <p>{comida.unidades} unidades</p> Unidades disponibles
            </div>
          </div>
        ))}
      </div>

      {/* Botón para navegar al elemento anterior */}
      <button className="carousel-control-prev" type="button" onClick={handlePrev} aria-label="Previous">
        <span className="carousel-control-icon">&lt;</span> {/* Ícono de anterior */}
      </button>

      {/* Botón para navegar al siguiente elemento */}
      <button className="carousel-control-next" type="button" onClick={handleNext} aria-label="Next">
        <span className="carousel-control-icon">&gt;</span> {/* Ícono de siguiente */}
      </button>

      {/* Indicadores del carrusel */}
      <div className="carousel-indicators">
        {comidas.map((_, index) => (
          <span
            key={index}
            className={`carousel-indicator ${index === currentIndex ? 'active' : ''}`} // Clase activa para el indicador actual
            onClick={() => setCurrentIndex(index)} // Cambia al índice correspondiente al hacer clic
            style={{
              backgroundColor: index === currentIndex ? 'blue' : 'gray', // Color del indicador
              cursor: 'pointer', // Cursor de puntero
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default ComidaSelector;
