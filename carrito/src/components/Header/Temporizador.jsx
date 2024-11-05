import React, { useEffect } from 'react';
import useTemporizador from './useTemporizador';
import { useCarrito } from '../context/CarritoContext';
import "./style.css";

const Temporizador = ({ duracion, pausar }) => {
  const { limpiarCarrito } = useCarrito();
  const { tiempoRestante, iniciar, pausar: pausarTemporizador } = useTemporizador(duracion, limpiarCarrito);

  useEffect(() => {
    iniciar();
  }, [iniciar]);

  useEffect(() => {
    if (pausar) {
      pausarTemporizador();
    }
  }, [pausar, pausarTemporizador]);

  if (tiempoRestante <= 0) {
    window.location.reload();
    return null; // O puedes mostrar un mensaje como "Carrito vacío"
  }

  return (
    <div className="temporizador alert alert-warning d-flex align-items-center" role="alert">
      <h2 className="m-0 me-2">{tiempoRestante} seg</h2> {/* Tamaño de fuente más pequeño */}
    </div>
  );
};

export default Temporizador;
