import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate, Link } from 'react-router-dom';
import Filtrar from "./Filtrar";
import FuncionService from "../../service/FuncionService";

const imageExists = async (url) => {
    return new Promise((resolve) => {
        const img = new Image();
        img.src = url;
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
    });
};

function Peliculas() {
    const navigate = useNavigate();
    const [funciones, setFunciones] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
    const [imagenes, setImagenes] = useState([]);
    const defaultImageUrl = '/path/to/default/image.png'; // Cambia esta ruta a tu imagen por defecto

    useEffect(() => {
        const fetchFunciones = async () => {
            try {
                const response = await FuncionService.getAllFunciones();
                setFunciones(response.data);
            } catch (error) {
                setError("Error al cargar las funciones.");
            } finally {
                setLoading(false);
            }
        };

        fetchFunciones();
    }, []);

    const verificarImagenes = useCallback(async (peliculas) => {
        const baseImgUrl = `/imgPelicula/`;
        const extensions = ['.png', '.jpg', '.jpeg', '.gif', '.jfif'];

        const imagenPromises = peliculas.map(async (pelicula) => {
            const imageName = pelicula.nombre.toLowerCase().replace(/\s+/g, '-');
            let validImageUrl = defaultImageUrl;

            // Verifica cada extensión de imagen
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

    const funcionesFiltradas = useMemo(() => {
        return funciones.filter((funcion) => {
            const idCategoriaFuncion = funcion.pelicula.categoria?.id_categoria;
            const seleccionada = parseInt(categoriaSeleccionada, 10);
            return categoriaSeleccionada ? idCategoriaFuncion === seleccionada : true;
        });
    }, [funciones, categoriaSeleccionada]);

    const peliculasUnicas = useMemo(() => {
        return Array.from(
            new Set(funcionesFiltradas.map(funcion => funcion.pelicula.id_pelicula))
        ).map(id => funcionesFiltradas.find(funcion => funcion.pelicula.id_pelicula === id));
    }, [funcionesFiltradas]);

    useEffect(() => {
        if (funciones.length > 0) {
            verificarImagenes(funciones.map(funcion => funcion.pelicula));
        }
    }, [funciones, verificarImagenes]);

    if (loading) return <p>Cargando funciones...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h3>Películas según las funciones</h3>
            <Filtrar setCategoriaSeleccionada={setCategoriaSeleccionada} />
            {peliculasUnicas.length > 0 ? (
                <ul>
                    {peliculasUnicas.map((funcion) => {
                        const peliculaConImagen = imagenes.find(img => img.nombre === funcion.pelicula.nombre);
                        return (
                            <li key={funcion.id}>
                                <Link to={"/boleteria"} state={{ pelicula: funcion.pelicula }}>
                                    <img
                                        src={peliculaConImagen ? peliculaConImagen.imagenUrl : defaultImageUrl}
                                        alt={peliculaConImagen ? funcion.pelicula.nombre : "Imagen no disponible"}
                                        style={{ width: '100px', height: '150px', cursor: 'pointer' }}
                                        onClick={() => navigate('/boleteria', { state: { pelicula: funcion.pelicula } })} // Cambiado aquí
                                    />
                                    <div>
                                        {funcion.pelicula.id_pelicula} - {funcion.pelicula.nombre} - {funcion.pelicula.categoria.nombre} - {funcion.sala.nombre}
                                    </div>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            ) : (
                <p>No hay funciones disponibles.</p>
            )}
        </div>
    );
}

export default Peliculas;
