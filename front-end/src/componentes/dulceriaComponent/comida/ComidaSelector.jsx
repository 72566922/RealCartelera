import React, { useState, useEffect } from 'react';
import CarruselComida from './CarrouselComida';

function ComidaSelector({ comidas, setComidaSeleccionada }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (Array.isArray(comidas) && comidas.length > 0) {
      setComidaSeleccionada(comidas[currentIndex]);
      console.log("Comida seleccionada automáticamente:", comidas[currentIndex]);
    } else {
      setComidaSeleccionada(null);
    }
  }, [currentIndex, comidas, setComidaSeleccionada]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? comidas.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === comidas.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <CarruselComida
      comidas={comidas}
      currentIndex={currentIndex}
      handlePrev={handlePrev}
      handleNext={handleNext}
      setCurrentIndex={setCurrentIndex}
    />
  );
}

export default ComidaSelector;
