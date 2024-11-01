import React, { useEffect, useState, useCallback } from "react";
import FuncionService from "../../service/FuncionService";

const imageExists = async (url) => {
    return new Promise((resolve) => {
        const img = new Image();
        img.src = url;
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
    });
};

function PeliculaFuncionComponent() {
    const [peliculas, setPeliculas] = useState([]);
    const [imagenes, setImagenes] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0); // Para el índice del carrusel
    const defaultImageUrl = `${process.env.PUBLIC_URL}/imgPelicula/default.png`;

    useEffect(() => {
        FuncionService.getPeliculasFromFunciones()
            .then(response => {
                setPeliculas(response.data);
            })
            .catch(error => {
                console.error("Error al obtener las películas:", error);
            });
    }, []);

    const verificarImagenes = useCallback(async (peliculas) => {
        const baseImgUrl = `${process.env.PUBLIC_URL}/imgPelicula/`;
        const extensions = ['.jpg', '.png', '.jpeg', '.jfif'];

        const imagenPromises = peliculas.map(async (pelicula) => {
            const imageName = pelicula.nombre.toLowerCase().replace(/\s+/g, '-');
            let validImageUrl = defaultImageUrl;

            for (const ext of extensions) {
                const exists = await imageExists(`${baseImgUrl}${imageName}${ext}`);
                if (exists) {
                    validImageUrl = `${baseImgUrl}${imageName}${ext}`;
                    break;
                }
            }
            return { ...pelicula, imagenUrl: validImageUrl };
        });

        const peliculasConImagenes = await Promise.all(imagenPromises);
        setImagenes(peliculasConImagenes);
    }, [defaultImageUrl]);

    useEffect(() => {
        if (peliculas.length > 0) {
            verificarImagenes(peliculas);
        }
    }, [peliculas, verificarImagenes]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % imagenes.length);
        }, 2000);
        return () => clearInterval(interval);
    }, [imagenes]);

    return (
        <div id="carouselPeliculas" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
                {imagenes.map((pelicula, index) => (
                    <div
                        key={index}
                        className={`carousel-item ${index === currentIndex ? "active" : ""}`}
                    >
                        <div className="card mx-auto" style={{ width: "18rem" }}>
                            <img
                                src={pelicula.imagenUrl}
                                className="card-img-top"
                                alt={pelicula.nombre}
                            />
                            <div className="card-body">
                                <h5 className="card-title text-center">{pelicula.nombre}</h5>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
        </div>
    );
}

export default PeliculaFuncionComponent;
