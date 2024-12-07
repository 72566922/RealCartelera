import React, { useEffect, useState, useCallback } from "react"; // Importa React, useState, useEffect, y useCallback desde React.
import FuncionService from "../../service/FuncionService"; // Importa el servicio para obtener las funciones y películas.

const imageExists = async (url) => { // Función asincrónica para verificar si una imagen existe en una URL.
    return new Promise((resolve) => {
        const img = new Image(); // Crea un nuevo objeto de imagen.
        img.src = url; // Establece la URL de la imagen.
        img.onload = () => resolve(true); // Si la imagen carga correctamente, resuelve la promesa con 'true'.
        img.onerror = () => resolve(false); // Si ocurre un error al cargar la imagen, resuelve la promesa con 'false'.
    });
};

function PeliculaFuncionComponent() { // Componente principal que maneja el carrusel de películas.
    const [peliculas, setPeliculas] = useState([]); // Estado para almacenar las películas obtenidas desde el servidor.
    const [imagenes, setImagenes] = useState([]); // Estado para almacenar las películas con las URLs de las imágenes.
    const [currentIndex, setCurrentIndex] = useState(0); // Estado para manejar el índice del carrusel.
    const defaultImageUrl = `${process.env.PUBLIC_URL}/build/imgPelicula/default.png`; // URL predeterminada para la imagen si no se encuentra una válida.

    useEffect(() => { // Efecto que se ejecuta una vez cuando el componente se monta.
        FuncionService.getPeliculasFromFunciones() // Llama al servicio para obtener las películas.
            .then(response => {
                setPeliculas(response.data); // Almacena las películas en el estado 'peliculas' cuando la respuesta es exitosa.
            })
            .catch(error => {
                console.error("Error al obtener las películas:", error); // Muestra un error si la obtención de películas falla.
            });
    }, []); // El efecto solo se ejecuta una vez al montar el componente.

    const verificarImagenes = useCallback(async (peliculas) => { // Función que verifica la existencia de imágenes para cada película.
        const baseImgUrl = `${process.env.PUBLIC_URL}/build/imgPelicula/`; // URL base para las imágenes.
        const extensions = ['.png']; // Extensiones de imagen a verificar.

        const imagenPromises = peliculas.map(async (pelicula) => { // Itera sobre las películas para verificar sus imágenes.
            const imageName = pelicula.nombre.toLowerCase().replace(/\s+/g, '-'); // Formatea el nombre de la película para usarlo en el nombre de la imagen.
            let validImageUrl = defaultImageUrl; // Asume que la imagen predeterminada es la válida.

            // Recorre las extensiones de imagen para verificar si existe alguna.
            for (const ext of extensions) {
                const exists = await imageExists(`${baseImgUrl}${imageName}${ext}`); // Verifica si la imagen existe.
                if (exists) {
                    validImageUrl = `${baseImgUrl}${imageName}${ext}`; // Si la imagen existe, actualiza la URL.
                    break; // Detiene la búsqueda si una imagen válida es encontrada.
                }
            }
            return { ...pelicula, imagenUrl: validImageUrl }; // Retorna la película con la URL de la imagen encontrada.
        });

        const peliculasConImagenes = await Promise.all(imagenPromises); // Espera a que todas las verificaciones de imágenes finalicen.
        setImagenes(peliculasConImagenes); // Almacena las películas con sus respectivas imágenes en el estado 'imagenes'.
    }, [defaultImageUrl]); // El efecto solo se ejecuta cuando cambia 'defaultImageUrl'.

    useEffect(() => { // Efecto para verificar las imágenes cuando las películas cambian.
        if (peliculas.length > 0) { // Verifica si hay películas disponibles.
            verificarImagenes(peliculas); // Llama a la función que verifica las imágenes.
        }
    }, [peliculas, verificarImagenes]); // El efecto se ejecuta cuando las películas cambian o cuando 'verificarImagenes' cambia.

    useEffect(() => { // Efecto para actualizar el índice del carrusel automáticamente.
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % imagenes.length); // Incrementa el índice y lo reinicia si llega al final.
        }, 2000); // Cambia cada 2 segundos.

        return () => clearInterval(interval); // Limpia el intervalo cuando el componente se desmonta o cuando las imágenes cambian.
    }, [imagenes]); // El efecto se ejecuta cuando cambia la lista de imágenes.

    return (
        <div id="carouselPeliculas" className="carousel slide" data-bs-ride="carousel"> {/* Contenedor principal del carrusel */}
            <div className="carousel-inner"> {/* Contenedor para los elementos del carrusel */}
                {imagenes.map((pelicula, index) => ( // Mapea sobre las películas con imágenes para crear los elementos del carrusel.
                    <div
                        key={index} // Usa el índice como clave para cada elemento del carrusel.
                        className={`carousel-item ${index === currentIndex ? "active" : ""}`}> {/* Marca el item actual como 'active' */}
                        <div className="card mx-auto" style={{ width: "18rem" }}> {/* Contenedor de la tarjeta de cada película */}
                            <img
                                src={pelicula.imagenUrl} // Muestra la imagen de la película.
                                className="card-img-top" // Clase de Bootstrap para la imagen.
                                alt={pelicula.nombre} // Texto alternativo con el nombre de la película.
                            />
                            <div className="card-body"> {/* Cuerpo de la tarjeta */}
                                <h5 className="card-title text-center">{pelicula.nombre}</h5> {/* Nombre de la película */}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PeliculaFuncionComponent; // Exporta el componente para que pueda ser utilizado en otros lugares.
