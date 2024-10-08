import React, { useState, useEffect } from 'react';
import CarruselBebida from './CarrouselBebida';

function BebidaSelector({ bebidas, setBebidaSeleccionada }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (bebidas.length > 0) {
      console.log('Bebida seleccionada automaticamente:', bebidas[currentIndex]);
      setBebidaSeleccionada(bebidas[currentIndex]);
    }
  }, [currentIndex, bebidas, setBebidaSeleccionada]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? bebidas.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === bebidas.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <CarruselBebida
      bebidas={bebidas}
      currentIndex={currentIndex}
      handlePrev={handlePrev}
      handleNext={handleNext}
      setCurrentIndex={setCurrentIndex}
    />
  );
}

export default BebidaSelector;
