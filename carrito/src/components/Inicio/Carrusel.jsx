import React, { useState, useEffect } from "react"; // Importa React, useState y useEffect desde React.

function Carrusel({ items }) { // Define el componente Carrusel que recibe 'items' como propiedad (elementos a mostrar en el carrusel).
  const [currentIndex, setCurrentIndex] = useState(0); // Estado para llevar el índice del elemento actualmente visible en el carrusel.

  // Efecto para mover el carrusel automáticamente
  useEffect(() => {
    // Establece un intervalo para cambiar el índice del carrusel cada 0.75 segundos.
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === items.length - 1 ? 0 : prevIndex + 1)); // Si se llega al último elemento, vuelve al primero.
    }, 750); // 750 milisegundos = 0.75 segundos

    return () => clearInterval(intervalId); // Limpia el intervalo cuando el componente se desmonta o cuando 'items.length' cambia.
  }, [items.length]); // Dependencia de 'items.length', lo que significa que el efecto se ejecutará nuevamente si cambia la longitud de los elementos.

  if (!Array.isArray(items) || items.length === 0) { // Verifica si 'items' es un array y si no está vacío.
    return <p>No hay elementos disponibles.</p>; // Muestra un mensaje si no hay elementos disponibles en el carrusel.
  }

  return (
    <div id="carouselExample" className="carousel slide" data-bs-ride="carousel"> {/* Contenedor principal del carrusel */}
      <div className="carousel-inner"> {/* Contenedor de los elementos del carrusel */}
        {items.map((item, index) => ( // Itera sobre los elementos de 'items' para mostrar cada uno en el carrusel.
          <div key={item.id} className={`carousel-item ${index === currentIndex ? 'active' : ''}`}> {/* Marca el elemento activo con la clase 'active' */}
            <div className="image-container" style={{ height: '200px', overflow: 'hidden' }}> {/* Contenedor de la imagen con altura fija y ocultando lo que sobresale */}
              <img
                className="d-block w-100" // Clase Bootstrap para hacer que la imagen ocupe todo el ancho del contenedor.
                src={`/build/imagenes/${item.nombre.toLowerCase().replace(/\s+/g, '-')}.png`} // Genera la URL de la imagen basándose en el nombre del item.
                alt={item.nombre} // Texto alternativo para la imagen.
                style={{ height: '100%', width: 'auto', objectFit: 'contain' }} // Ajusta el tamaño de la imagen para que se ajuste sin deformarse.
              />
            </div>
          </div>
        ))}
      </div>

      <div className="carousel-indicators"> {/* Contenedor para los indicadores de carrusel */}
        {items.map((_, index) => ( // Itera sobre 'items' para crear un indicador por cada elemento del carrusel.
          <button
            key={index} // Usar 'index' como clave para cada botón de indicador.
            type="button"
            className={`carousel-indicator ${index === currentIndex ? 'active' : ''}`} // Marca el indicador activo con la clase 'active'.
            style={{
              backgroundColor: index === currentIndex ? 'blue' : 'gray', // Cambia el color del indicador dependiendo de si está activo.
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default Carrusel; // Exporta el componente para que pueda ser utilizado en otros lugares.
