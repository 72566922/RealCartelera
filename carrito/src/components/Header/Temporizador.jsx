import React, { useEffect } from 'react';
import useTemporizador from './useTemporizador';
import { useCarrito } from '../context/CarritoContext';
import "./style.css";

const Temporizador = ({ duracion, pausar }) => {
  // Obtiene la función limpiarCarrito del contexto para vaciar el carrito cuando el tiempo se agote.
  const { limpiarCarrito } = useCarrito();

  // Usa el hook useTemporizador para manejar la lógica del temporizador y la acción cuando el tiempo se agota.
  const { tiempoRestante, iniciar, pausar: pausarTemporizador } = useTemporizador(duracion, limpiarCarrito);

  // Inicia el temporizador cuando el componente se monta o cuando 'iniciar' cambia.
  useEffect(() => {
    iniciar();
  }, [iniciar]);

  // Si la prop 'pausar' cambia a true, se pausa el temporizador.
  useEffect(() => {
    if (pausar) {
      pausarTemporizador();
    }
  }, [pausar, pausarTemporizador]);

  // Si el tiempo restante es 0, recarga la página (vacía el carrito) y detiene la ejecución del componente.
  if (tiempoRestante <= 0) {
    window.location.reload();
    return null; // O puedes mostrar un mensaje como "Carrito vacío"
  }

  // Renderiza el temporizador mostrando el tiempo restante en segundos.
  return (
    <div className="temporizador alert alert-warning d-flex align-items-center" role="alert">
      <h2 className="m-0 me-2">{tiempoRestante} seg</h2> {/* Tamaño de fuente más pequeño */}
    </div>
  );
};

export default Temporizador;
