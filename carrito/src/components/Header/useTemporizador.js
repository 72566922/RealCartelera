import { useState, useEffect } from 'react';

const useTemporizador = (duracion, onTiempoAgotado) => {
  const [tiempoRestante, setTiempoRestante] = useState(duracion);
  const [activo, setActivo] = useState(false);
  const [pausado, setPausado] = useState(false);

  useEffect(() => {
    let intervalo;

    if (activo && tiempoRestante > 0 && !pausado) {
      intervalo = setInterval(() => {
        setTiempoRestante((prevTiempo) => prevTiempo - 1);
      }, 1000);
    } else if (tiempoRestante === 0) {
      onTiempoAgotado();
      setActivo(false);
    }

    return () => clearInterval(intervalo);
  }, [activo, tiempoRestante, pausado, onTiempoAgotado]);

  const iniciar = () => {
    setActivo(true);
    setPausado(false);
  };

  const detener = () => {
    setActivo(false);
    setPausado(false);
  };

  const pausar = () => {
    setPausado(true);
  };

  const reiniciar = () => {
    setActivo(false);
    setTiempoRestante(duracion);
    setPausado(false);
  };

  return {
    tiempoRestante,
    iniciar,
    detener,
    pausar,
    reiniciar,
  };
};

export default useTemporizador;
