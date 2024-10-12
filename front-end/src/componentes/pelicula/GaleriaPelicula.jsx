import React, { useEffect, useState, useCallback } from "react";
import SelectPeliculaService from "../../services/SelectPeliculaService"; // Importar el servicio para obtener películas por categoría
import PeliculaItem from "./PeliculaItem"; // Importar el componente para mostrar cada película
import { imageExists } from "./imageUtils"; // Importar la función de utilidades para verificar imágenes
import './style.css';

function GaleriaPelicula({ categoria, busqueda }) {
  const [imagenes, setImagenes] = useState([]);

  // Función para verificar las imágenes
  const verificarImagenes = useCallback(async (peliculas) => {
    const baseImgUrl = `/imgPelicula/`;
    const extensions = ['.png', '.jpg', '.jpeg', '.gif', '.jfif'];

    const imagenPromises = peliculas.map(async (pelicula) => {
      const imageName = pelicula.nombre.toLowerCase().replace(/\s+/g, '-');
      let validImageUrl = '/path/to/default/image.png';  // Imagen por defecto

      try {
        // Verifica todas las extensiones y guarda la primera válida
        for (const ext of extensions) {
          const exists = await imageExists(`${baseImgUrl}${imageName}${ext}`);
          if (exists) {
            validImageUrl = `${baseImgUrl}${imageName}${ext}`;
            break;  // Sale del bucle si encuentra una imagen válida
          }
        }

        return { ...pelicula, imagenUrl: validImageUrl };
      } catch (error) {
        console.error(`Error al verificar imagen para la película ${pelicula.nombre}:`, error);
        return { ...pelicula, imagenUrl: '/path/to/default/image.png' };  // Retorna imagen por defecto si falla
      }
    });

    const peliculasConImagenes = await Promise.all(imagenPromises);
    setImagenes(peliculasConImagenes);
  }, []);

  // Obtener películas por categoría seleccionada o búsqueda
  useEffect(() => {
    const fetchPeliculas = async () => {
      try {
        let response;
        if (categoria) {
          response = await SelectPeliculaService.getPeliculasByCategoria(categoria);
        } else {
          response = await SelectPeliculaService.getAllPeliculas();
        }

        let peliculasFiltradas = response.data;
        if (busqueda) {
          // Normaliza la búsqueda y filtra las películas
          const normalizedBusqueda = busqueda.toLowerCase().replace(/-/g, ' '); // Normaliza el input
          peliculasFiltradas = peliculasFiltradas.filter(pelicula =>
            pelicula.nombre.toLowerCase().replace(/-/g, ' ').includes(normalizedBusqueda)
          );
        }

        verificarImagenes(peliculasFiltradas);
      } catch (error) {
        console.error("Error al obtener las películas:", error);
      }
    };

    fetchPeliculas();
  }, [categoria, busqueda, verificarImagenes]);

  return (
    <div className="galeria-peliculas container my-4">
      <div className="row">
        {imagenes.map((pelicula) => (
          <div className="col-md-4 mb-3" key={pelicula.id_pelicula || pelicula.nombre}>
            <PeliculaItem pelicula={pelicula} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default GaleriaPelicula;
