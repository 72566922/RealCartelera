import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate, Link } from 'react-router-dom';
import Filtrar from "./Filtrar"; // Componente para filtrar películas por categoría
import BuscarNombre from "./BuscarNombre"; // Componente para buscar películas por nombre
import FuncionService from "../../service/FuncionService"; // Servicio para obtener las funciones
import "./filtrar.css"; // Estilo CSS para el componente

// Función para verificar si una imagen existe en la ruta proporcionada
const imageExists = async (url) => {
    return new Promise((resolve) => {
        const img = new Image();
        img.src = url;
        img.onload = () => resolve(true); // Si la imagen se carga correctamente
        img.onerror = () => resolve(false); // Si la imagen no se encuentra
    });
};

function Peliculas() {
    const navigate = useNavigate(); // Hook para navegación
    const [funciones, setFunciones] = useState([]); // Estado para almacenar las funciones
    const [loading, setLoading] = useState(true); // Estado para el indicador de carga
    const [error, setError] = useState(null); // Estado para manejar errores
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(''); // Estado para la categoría seleccionada
    const [nombreBuscado, setNombreBuscado] = useState(''); // Estado para el nombre buscado
    const [imagenes, setImagenes] = useState([]); // Estado para almacenar las imágenes de las películas
    const defaultImageUrl = '/path/to/default/image.png'; // Ruta de la imagen por defecto si no se encuentra la imagen de la película

    // useEffect para cargar las funciones al montar el componente
    useEffect(() => {
        const fetchFunciones = async () => {
            try {
                const response = await FuncionService.getAllFunciones(); // Obtiene las funciones desde el servicio
                setFunciones(response.data); // Actualiza el estado con las funciones obtenidas
            } catch (error) {
                setError("Error al cargar las funciones."); // Manejo de error si ocurre algún problema
            } finally {
                setLoading(false); // Finaliza la carga
            }
        };

        fetchFunciones(); // Llama a la función para obtener las funciones
    }, []); // Este efecto solo se ejecuta una vez al montar el componente

    // useCallback para verificar si las imágenes existen para las películas
    const verificarImagenes = useCallback(async (peliculas) => {
        const baseImgUrl = `/build/imgPelicula/`; // Ruta base de las imágenes
        const extensions = ['.png']; // Extensiones posibles de las imágenes

        const imagenPromises = peliculas.map(async (pelicula) => {
            const imageName = pelicula.nombre.toLowerCase().replace(/\s+/g, '-'); // Formatea el nombre de la película para usarlo en la URL
            let validImageUrl = defaultImageUrl; // Inicializa la URL de la imagen con la imagen por defecto

            for (const ext of extensions) {
                const exists = await imageExists(`${baseImgUrl}${imageName}${ext}`); // Verifica si la imagen existe
                if (exists) {
                    validImageUrl = `${baseImgUrl}${imageName}${ext}`; // Si existe, actualiza la URL de la imagen
                    break;
                }
            }
            return { ...pelicula, imagenUrl: validImageUrl }; // Devuelve la película con la URL de la imagen
        });

        const peliculasConImagenes = await Promise.all(imagenPromises); // Espera que todas las imágenes se verifiquen
        setImagenes(peliculasConImagenes); // Actualiza el estado con las películas y sus imágenes
    }, [defaultImageUrl]);

    // useMemo para filtrar las funciones según la categoría seleccionada
    const funcionesFiltradas = useMemo(() => {
        return funciones.filter((funcion) => {
            const idCategoriaFuncion = funcion.pelicula.categoria?.id_categoria; // Obtiene el ID de la categoría de la función
            const seleccionada = parseInt(categoriaSeleccionada, 10); // Convierte la categoría seleccionada a número
            return categoriaSeleccionada ? idCategoriaFuncion === seleccionada : true; // Filtra solo si hay una categoría seleccionada
        });
    }, [funciones, categoriaSeleccionada]); // Dependencias: se vuelve a ejecutar si `funciones` o `categoriaSeleccionada` cambian

    // useMemo para obtener solo las películas únicas basadas en sus IDs
    const peliculasUnicas = useMemo(() => {
        return Array.from(
            new Set(funcionesFiltradas.map(funcion => funcion.pelicula.id_pelicula)) // Elimina duplicados basados en ID de película
        ).map(id => funcionesFiltradas.find(funcion => funcion.pelicula.id_pelicula === id)); // Mapea para obtener las películas únicas
    }, [funcionesFiltradas]);

    // useMemo para filtrar las películas por el nombre buscado
    const peliculasFiltradasPorNombre = useMemo(() => {
        const nombreNormalizado = nombreBuscado.toLowerCase().replace(/[\s-]/g, ""); // Normaliza el nombre buscado
        return peliculasUnicas.filter((funcion) => {
            const nombrePeliculaNormalizado = funcion.pelicula.nombre.toLowerCase().replace(/[\s-]/g, ""); // Normaliza el nombre de la película
            return nombrePeliculaNormalizado.includes(nombreNormalizado); // Filtra por el nombre buscado
        });
    }, [peliculasUnicas, nombreBuscado]); // Dependencias: se vuelve a ejecutar si `peliculasUnicas` o `nombreBuscado` cambian

    // useEffect para verificar las imágenes de las películas cuando se cargan las funciones
    useEffect(() => {
        if (funciones.length > 0) {
            verificarImagenes(funciones.map(funcion => funcion.pelicula)); // Llama a la función para verificar las imágenes
        }
    }, [funciones, verificarImagenes]); // Dependencias: se vuelve a ejecutar si `funciones` cambian

    // Si estamos cargando, mostramos un mensaje de carga
    if (loading) return <p>Cargando funciones...</p>;

    // Si ocurre un error, mostramos el mensaje de error
    if (error) return <p>{error}</p>;

    return (
        <div className="container">
            <h3 className="text-center">Películas según las funciones</h3>
            <Filtrar setCategoriaSeleccionada={setCategoriaSeleccionada} /> {/* Componente de filtro para categoría */}
            <BuscarNombre onSearch={setNombreBuscado} /> {/* Componente de búsqueda por nombre */}

            {/* Si hay películas filtradas por nombre, las mostramos */}
            {peliculasFiltradasPorNombre.length > 0 ? (
                <div className="row">
                    {peliculasFiltradasPorNombre.map((funcion) => {
                        const peliculaConImagen = imagenes.find(img => img.nombre === funcion.pelicula.nombre); // Busca la imagen correspondiente
                        return (
                            <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-3" key={`${funcion.id}-${funcion.pelicula.id_pelicula}`}>
                                <div className="card">
                                    <Link to={"/boleteria"} state={{ pelicula: funcion.pelicula }}> {/* Enlace a la página de boletería */}
                                        <img
                                            src={peliculaConImagen ? peliculaConImagen.imagenUrl : defaultImageUrl} // Usa la imagen de la película o la imagen por defecto
                                            alt={peliculaConImagen ? funcion.pelicula.nombre : "Imagen no disponible"}
                                            className="card-img-top"
                                            style={{ cursor: 'pointer' }} // Estilo para indicar que la imagen es clickeable
                                            onClick={() => navigate('/boleteria', { state: { pelicula: funcion.pelicula } })} // Navega a la página de boletería con la película seleccionada
                                        />
                                        <div className="card-body">
                                            <h5 className="card-title">{funcion.pelicula.nombre}</h5>
                                            <p className="card-text">
                                                {funcion.pelicula.categoria.nombre} - {funcion.sala.nombre} {/* Muestra categoría y sala */}
                                            </p>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <p>No hay funciones disponibles.</p> // Mensaje si no hay películas que mostrar
            )}
        </div>
    );
}

export default Peliculas;
