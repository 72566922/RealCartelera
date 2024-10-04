import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom"; // Importar useParams
import SelectPeliculaService from "../../services/SelectPeliculaService";
import { videoExists } from "./videoUtils";

function ComprarBoletoComponent() {
    const { id_pelicula } = useParams(); // Obtener el ID de la película desde la URL
    const [peliculaSeleccionada, setPeliculaSeleccionada] = useState(null); // Estado para la película seleccionada

    const verificarVideo = useCallback(async (pelicula) => {
        const baseVideoUrl = `/trailler/`; // URL base para los videos
        const extensions = ['.mp4']; // Extensiones de video

        const videoName = pelicula.nombre.toLowerCase().replace(/\s+/g, '-');
        let validVideoUrl = '/path/to/default/video.mp4'; // Video por defecto

        try {
            for (const ext of extensions) {
                const videoUrl = `${baseVideoUrl}${videoName}${ext}`;
                const exists = await videoExists(videoUrl);
                if (exists) {
                    validVideoUrl = videoUrl; // Asigna la URL válida
                    console.log(`Video encontrado: ${videoUrl}`); // Mostrar en consola si se encontró el video
                    break; // Sale del bucle si encuentra un video válido
                }
            }

            console.log(`Verificación de video exitosa para: ${pelicula.nombre}`); // Mensaje de éxito
            return { ...pelicula, videoUrl: validVideoUrl };
        } catch (error) {
            console.error(`Error al verificar video para la película ${pelicula.nombre}:`, error);
            return { ...pelicula, videoUrl: '/path/to/default/video.mp4' }; // Video por defecto si falla
        }
    }, []);

    useEffect(() => {
        const fetchPelicula = async () => {
            try {
                const response = await SelectPeliculaService.getPeliculaById(id_pelicula); // Obtener la película por ID
                const peliculaConVideo = await verificarVideo(response.data);
                setPeliculaSeleccionada(peliculaConVideo); // Establecer la película seleccionada

                // Mostrar en consola el nombre de la imagen y el video seleccionados
                const imageName = peliculaConVideo.nombre.toLowerCase().replace(/\s+/g, '-'); // Suponiendo que el nombre de la imagen es similar al de la película
                console.log(`Imagen seleccionada: ${imageName}`);
                console.log(`Video seleccionado: ${peliculaConVideo.videoUrl}`);
            } catch (error) {
                console.error("Error al obtener la película:", error);
            }
        };

        fetchPelicula();
    }, [id_pelicula, verificarVideo]);

    return (
        <div className="container mt-5"> {/* Clase contenedor de Bootstrap */}
            <h2 className="text-center mb-4">Comprar Boleto</h2>

            {peliculaSeleccionada && (
                <div className="video-container text-center">
                    <h3>{peliculaSeleccionada.titulo}</h3>
                    <video controls className="w-100"> {/* Clase para que el video ocupe el 100% del ancho */}
                        <source src={peliculaSeleccionada.videoUrl} type="video/mp4" />
                        Tu navegador no soporta la etiqueta de video.
                    </video>
                </div>
            )}
        </div>
    );
}

export default ComprarBoletoComponent;
