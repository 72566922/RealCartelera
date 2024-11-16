import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate, Link } from 'react-router-dom';
import Filtrar from "./Filtrar";
import BuscarNombre from "./BuscarNombre";
import FuncionService from "../../service/FuncionService";
import "./filtrar.css";

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
    const [nombreBuscado, setNombreBuscado] = useState('');
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

    const peliculasFiltradasPorNombre = useMemo(() => {
        const nombreNormalizado = nombreBuscado.toLowerCase().replace(/[\s-]/g, ""); // Quita espacios y guiones
        return peliculasUnicas.filter((funcion) => {
            const nombrePeliculaNormalizado = funcion.pelicula.nombre.toLowerCase().replace(/[\s-]/g, "");
            return nombrePeliculaNormalizado.includes(nombreNormalizado);
        });
    }, [peliculasUnicas, nombreBuscado]);

    useEffect(() => {
        if (funciones.length > 0) {
            verificarImagenes(funciones.map(funcion => funcion.pelicula));
        }
    }, [funciones, verificarImagenes]);

    if (loading) return <p>Cargando funciones...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="container">
            <h3 className="text-center">Películas según las funciones</h3>
            <Filtrar setCategoriaSeleccionada={setCategoriaSeleccionada} />
            <BuscarNombre onSearch={setNombreBuscado} /> {/* Mantén el botón de búsqueda */}

            {peliculasFiltradasPorNombre.length > 0 ? (
                <div className="row">
                    {peliculasFiltradasPorNombre.map((funcion) => {
                        const peliculaConImagen = imagenes.find(img => img.nombre === funcion.pelicula.nombre);
                        return (
                            <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-3" key={`${funcion.id}-${funcion.pelicula.id_pelicula}`}>
                                <div className="card">
                                    <Link to={"/boleteria"} state={{ pelicula: funcion.pelicula }}>
                                        <img
                                            src={peliculaConImagen ? peliculaConImagen.imagenUrl : defaultImageUrl}
                                            alt={peliculaConImagen ? funcion.pelicula.nombre : "Imagen no disponible"}
                                            className="card-img-top"
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => navigate('/boleteria', { state: { pelicula: funcion.pelicula } })}
                                        />
                                        <div className="card-body">
                                            <h5 className="card-title">{funcion.pelicula.nombre}</h5>
                                            <p className="card-text">
                                                {funcion.pelicula.categoria.nombre} - {funcion.sala.nombre}
                                            </p>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <p>No hay funciones disponibles.</p>
            )}
        </div>

    );
}

export default Peliculas;
