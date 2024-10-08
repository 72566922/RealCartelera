import React, { useState, useEffect } from 'react';
import CarruselComida from './CarrouselComida';

function ComidaSelector({ comidas, setComidaSeleccionada }) {
  // Estado para mantener el índice actual de la comida seleccionada en el carrusel
  const [currentIndex, setCurrentIndex] = useState(0);

  // useEffect se ejecuta cuando cambian el índice actual (currentIndex) o las comidas.
  useEffect(() => {
    // Comprueba si comidas es un array válido y tiene elementos
    if (Array.isArray(comidas) && comidas.length > 0) {
      // Muestra en la consola la comida seleccionada automáticamente cuando cambia el índice
      console.log("Comida seleccionada automáticamente:", comidas[currentIndex]);
      // Actualiza la comida seleccionada en el componente padre usando el setComidaSeleccionada
      setComidaSeleccionada(comidas[currentIndex]);
    } else {
      // Si no hay comidas disponibles, establece la comida seleccionada como null
      setComidaSeleccionada(null);
    }
    // Dependencias: Se ejecutará cada vez que currentIndex o comidas cambien
  }, [currentIndex, comidas, setComidaSeleccionada]);

  // Función para ir al ítem anterior en el carrusel.
  const handlePrev = () => {
    // Si el índice actual es 0, vuelve al último elemento del array. De lo contrario, reduce el índice.
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? comidas.length - 1 : prevIndex - 1));
  };

  // Función para ir al siguiente ítem en el carrusel.
  const handleNext = () => {
    // Si el índice actual es el último, vuelve al primero. De lo contrario, aumenta el índice.
    setCurrentIndex((prevIndex) => (prevIndex === comidas.length - 1 ? 0 : prevIndex + 1));
  };

  // Renderiza el componente CarruselComida pasándole las comidas y las funciones de control (prev, next)
  return (
    <CarruselComida
      comidas={comidas} // Pasa la lista de comidas (array de objetos) al carrusel para que las muestre.
      currentIndex={currentIndex} // Pasa el índice actual al carrusel, indicando qué comida está activa (visible).
      handlePrev={handlePrev} // Pasa la función para retroceder en el carrusel. Se ejecuta cuando el usuario presiona el botón "Anterior".
      handleNext={handleNext} // Pasa la función para avanzar en el carrusel. Se ejecuta cuando el usuario presiona el botón "Siguiente".
      setCurrentIndex={setCurrentIndex} // Pasa la función que actualiza el índice. Permite cambiar el índice directamente, por ejemplo, cuando el usuario hace clic en los indicadores del carrusel.
    />
  );

}

export default ComidaSelector;
