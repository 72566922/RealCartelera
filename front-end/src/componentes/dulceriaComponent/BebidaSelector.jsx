import React, { useState, useEffect } from 'react';
import './styleDulceria/bebidaSelector.css';

function BebidaSelector({ bebidas, setBebidaSeleccionada }) {
  // Estado para rastrear el índice actual del carrusel
  const [currentIndex, setCurrentIndex] = useState(0);

  // Efecto que se ejecuta cada vez que cambia el índice actual o la lista de bebidas
  useEffect(() => {
    // Verifica si hay bebidas disponibles
    if (bebidas.length > 0) {
      console.log('Producto actual:', bebidas[currentIndex]); // Imprime la bebida actual
      setBebidaSeleccionada(bebidas[currentIndex]); // Establece la bebida seleccionada
    }
  }, [currentIndex, bebidas, setBebidaSeleccionada]);

  // Función para manejar el clic en el botón "Anterior"
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => {
      // Calcula el nuevo índice
      const newIndex = prevIndex === 0 ? bebidas.length - 1 : prevIndex - 1;
      console.log('Navegando a anterior:', bebidas[newIndex]); // Imprime la bebida a la que se navega
      return newIndex; // Actualiza el índice actual
    });
  };

  // Verifica si hay bebidas disponibles, si no, muestra un mensaje
  if (bebidas.length === 0) {
    return <p>No hay bebidas disponibles.</p>; // Mensaje si no hay bebidas
  }

  // Función para manejar el clic en el botón "Siguiente"
  const handleNext = () => {
    setCurrentIndex((prevIndex) => {
      // Calcula el nuevo índice
      const newIndex = prevIndex === bebidas.length - 1 ? 0 : prevIndex + 1;
      console.log('Navegando a siguiente:', bebidas[newIndex]); // Imprime la bebida a la que se navega
      return newIndex; // Actualiza el índice actual
    });
  };

  return (
    <div className="carousel">
      <div className="carousel-inner">
        {/* Mapea a través de las bebidas y genera los elementos del carrusel */}
        {bebidas.map((bebida, index) => (
          <div
            key={bebida.id_bebida}
            className={`carousel-item ${index === currentIndex ? 'active' : ''}` } // Clase activa para la bebida seleccionada
          >
            <div className="image-container"> {/* Nuevo contenedor para la imagen */}
              <img
                className="d-block w-100"
                src={`/imagenes/${bebida.dulce.nombre.toLowerCase().replace(/\s+/g, '-')}.png`} // Ruta de la imagen
                alt={bebida.dulce.nombre} // Texto alternativo para la imagen
              />
            </div>
            <div className="carousel-caption d-block d-md-block">
              <h5>{bebida.dulce.nombre}</h5> Nombre de la bebida
              <p>{bebida.litros} Litros - ${bebida.precio}</p> Cantidad y precio
              <p>{bebida.unidades} unidades</p> Unidades disponibles
            </div>
          </div>
        ))}
      </div>
  
      {/* Botones de navegación dentro del contenedor padre */}
      <button className="carousel-control-prev" type="button" onClick={handlePrev} aria-label="Previous">
        <span className="carousel-control-icon">&lt;</span> {/* Ícono de anterior */}
      </button>
  
      <button className="carousel-control-next" type="button" onClick={handleNext} aria-label="Next">
        <span className="carousel-control-icon">&gt;</span> {/* Ícono de siguiente */}
      </button>
  
      {/* Puntos de navegación */}
      <div className="carousel-indicators">
        {bebidas.map((_, index) => (
          <span
            key={index}
            className={`carousel-indicator ${index === currentIndex ? 'active' : ''}`} // Clase activa para el indicador actual
            onClick={() => setCurrentIndex(index)} // Cambia al índice correspondiente al hacer clic
            style={{
              backgroundColor: index === currentIndex ? 'blue' : 'gray', // Cambiar color según el índice activo
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default BebidaSelector;
