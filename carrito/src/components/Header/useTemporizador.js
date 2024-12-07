import { useState, useEffect } from 'react';


const useTemporizador = (duracion, onTiempoAgotado) => {
  // Estado para almacenar el tiempo restante del temporizador.
  const [tiempoRestante, setTiempoRestante] = useState(duracion);
  
  // Estado que indica si el temporizador está activo o no.
  const [activo, setActivo] = useState(false);
  
  // Estado que indica si el temporizador está pausado.
  const [pausado, setPausado] = useState(false);

  // Efecto que maneja el temporizador, se ejecuta cada vez que cambia alguno de los estados dependientes.
  useEffect(() => {
    let intervalo;

    // Si el temporizador está activo, no se ha agotado el tiempo y no está pausado, iniciar el contador.
    if (activo && tiempoRestante > 0 && !pausado) {
      intervalo = setInterval(() => {
        // Disminuir el tiempo restante en 1 segundo.
        setTiempoRestante((prevTiempo) => prevTiempo - 1);
      }, 1000);
    } else if (tiempoRestante === 0) {
      // Si el tiempo se agotó, ejecutar la función onTiempoAgotado y detener el temporizador.
      onTiempoAgotado();
      setActivo(false);
    }

    // Limpiar el intervalo cuando el componente se desmonte o se actualicen los estados.
    return () => clearInterval(intervalo);
  }, [activo, tiempoRestante, pausado, onTiempoAgotado]);

  // Función para iniciar el temporizador.
  const iniciar = () => {
    setActivo(true);
    setPausado(false);
  };

  // Función para detener el temporizador sin reiniciarlo.
  const detener = () => {
    setActivo(false);
    setPausado(false);
  };

  // Función para pausar el temporizador.
  const pausar = () => {
    setPausado(true);
  };

  // Función para reiniciar el temporizador a su duración inicial.
  const reiniciar = () => {
    setActivo(false);
    setTiempoRestante(duracion);
    setPausado(false);
  };

  // Devolver el estado del temporizador y las funciones para controlarlo.
  return {
    tiempoRestante,
    iniciar,
    detener,
    pausar,
    reiniciar,
  };
};

export default useTemporizador;
