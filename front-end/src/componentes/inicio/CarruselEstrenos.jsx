import React, { useEffect, useState, useCallback } from "react";
import EstrenoService from "../../services/EstrenosService";
import CarruselItem from "./CarrouselItem";
import '../inicio/style.css';


function CarruselEstrenos() {
  const [imagenes, setImagenes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const imageExists = (url) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = url;
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
    });
  };

  const verificarImagenes = useCallback(async (peliculas) => {
    const baseImgUrl = `/imgPelicula/`;
    const extensions = ['.png', '.jpg', '.jpeg', '.gif', '.jfif'];

    const imagenPromises = peliculas.map(async (pelicula) => {
      const imageChecks = await Promise.all(
        extensions.map(ext => imageExists(`${baseImgUrl}${pelicula.nombre.toLowerCase().replace(/\s+/g, '-')}${ext}`))
      );
      const validExtensionIndex = imageChecks.findIndex(result => result);
      const validImageUrl = validExtensionIndex !== -1 
        ? `${baseImgUrl}${pelicula.nombre.toLowerCase().replace(/\s+/g, '-')}${extensions[validExtensionIndex]}`
        : '/path/to/default/image.png';

      return { ...pelicula, imagenUrl: validImageUrl };
    });

    const peliculasConImagenes = await Promise.all(imagenPromises);
    setImagenes(peliculasConImagenes);
  }, []);

  useEffect(() => {
    EstrenoService.getAllEstrenos()
      .then(response => {
        verificarImagenes(response.data);
      })
      .catch(error => {
        console.error("Error fetching movies:", error);
      });
  }, [verificarImagenes]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === imagenes.length - 1 ? 0 : prevIndex + 1));
    }, 2000); // Cambia cada 2 segundos

    return () => clearInterval(intervalId); // Limpia el intervalo al desmontar
  }, [imagenes.length]);

  return (
    <div className="mt-5">
      {imagenes.length > 0 ? (
        <div
          id="carouselEstrenos"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            {imagenes.map((pelicula, index) => (
              <CarruselItem
                key={pelicula.id_pelicula}
                pelicula={pelicula}
                active={index === currentIndex} // Establece la clase 'active' según el índice actual
              />
            ))}
          </div>
          {/* Eliminadas las flechas de navegación */}
        </div>
      ) : (
        <p>No hay estrenos disponibles.</p>
      )}
    </div>
  );
}

export default CarruselEstrenos;
