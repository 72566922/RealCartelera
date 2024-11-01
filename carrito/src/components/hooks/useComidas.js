import { useState, useEffect } from 'react';
import ComidaService from '../../service/ComidaService';

const imageExists = async (url) => {
    return new Promise((resolve) => {
        const img = new Image();
        img.src = url;
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
    });
};

const useComidas = () => {
    const [comidas, setComidas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const defaultImageUrl = `${process.env.PUBLIC_URL}/imagenes/default.png`; // Imagen por defecto

    useEffect(() => {
        const fetchComidas = async () => {
            try {
                const response = await ComidaService.getAllComidas();

                // Verificar y asignar imágenes
                const baseImgUrl = `${process.env.PUBLIC_URL}/imagenes/`;
                const extensions = ['.jpg', '.png', '.jpeg', '.jfif'];

                const comidasConImagenes = await Promise.all(
                    response.data.map(async (comida) => {
                        const imageName = comida.dulce.nombre.toLowerCase().replace(/\s+/g, '-');
                        let validImageUrl = defaultImageUrl;

                        for (const ext of extensions) {
                            const exists = await imageExists(`${baseImgUrl}${imageName}${ext}`);
                            if (exists) {
                                validImageUrl = `${baseImgUrl}${imageName}${ext}`;
                                break;
                            }
                        }
                        return { ...comida, imagenUrl: validImageUrl };
                    })
                );

                setComidas(comidasConImagenes);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchComidas();
    }, [defaultImageUrl]);

    const venderComidas = async (ventas) => {
        try {
            const response = await ComidaService.venderComidas(ventas);
            setComidas(prevComidas => 
                prevComidas.map(comida => {
                    const venta = ventas.find(v => v.id === comida.id_comida);
                    return venta ? { ...comida, gramos: comida.gramos - venta.cantidadVendida } : comida;
                })
            );
            return response.data;
        } catch (error) {
            console.error("Error al vender comidas:", error);
            throw error;
        }
    };

    return { comidas, loading, error, venderComidas };
};

export default useComidas;
