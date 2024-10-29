import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import SelectPeliculaService from "../../services/SelectPeliculaService";
import { videoExists } from "./filtrarPelicula/videoUtils";
import PeliculaDetails from "./filtrarPelicula/PeliculaDetails";
import FuncionesPorPelicula from "./filtrarPelicula/FuncionesPorPelicula"; // Asegúrate de que la ruta sea correcta
import '../boletaVentaComponent/filtrarPelicula/style.css';

function ComprarBoletoComponent() {
    const { id_pelicula } = useParams();
    const [peliculaSeleccionada, setPeliculaSeleccionada] = useState(null);

    const manejarVenta = (asientosSeleccionados) => {
        console.log('Asientos para la venta:', asientosSeleccionados);
        // Aquí puedes implementar la lógica para procesar la venta
    };

    const verificarVideo = useCallback(async (pelicula) => {
        const baseVideoUrl = `/trailler/`;
        const extensions = ['.mp4'];
        const videoName = pelicula.nombre.toLowerCase().replace(/\s+/g, '-');
        let validVideoUrl = '/path/to/default/video.mp4';

        try {
            for (const ext of extensions) {
                const videoUrl = `${baseVideoUrl}${videoName}${ext}`;
                const exists = await videoExists(videoUrl);
                if (exists) {
                    validVideoUrl = videoUrl;
                    break;
                }
            }
        } catch (error) {
            console.error("Error al verificar el video:", error);
        }

        return { ...pelicula, videoUrl: validVideoUrl };
    }, []);

    useEffect(() => {
        const fetchPelicula = async () => {
            try {
                const response = await SelectPeliculaService.getPeliculaById(id_pelicula);
                const peliculaConVideo = await verificarVideo(response.data);
                setPeliculaSeleccionada(peliculaConVideo);
            } catch (error) {
                console.error("Error al obtener la película:", error);
            }
        };

        fetchPelicula();
    }, [id_pelicula, verificarVideo]);

    return (
        <div className="mt-5"> {/* Clase de Bootstrap para el contenedor */}
            {peliculaSeleccionada ? (
                <>
                    <PeliculaDetails pelicula={peliculaSeleccionada} />
                    <div className="video-container text-center mt-4">
                        <h3 className="mb-3">{peliculaSeleccionada.nombre}</h3>
                        <video controls className="w-100" style={{ maxHeight: "500px" }}>
                            <source src={peliculaSeleccionada.videoUrl} type="video/mp4" />
                            Tu navegador no soporta la etiqueta de video.
                        </video>
                    </div>
                    <FuncionesPorPelicula 
                        idPelicula={id_pelicula} 
                        addToCart={manejarVenta} // Pasar la función manejarVenta
                    />
                </>
            ) : (
                <div>Cargando detalles de la película...</div>
            )}
        </div>
    );
}

export default ComprarBoletoComponent;
