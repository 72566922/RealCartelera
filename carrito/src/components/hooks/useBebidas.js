import { useState, useEffect } from 'react';
import BebidaService from '../../service/BebidaService';

const imageExists = async (url) => {
    return new Promise((resolve) => {
        const img = new Image();
        img.src = url;
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
    });
};

const checkImageUrls = async (imageNames) => {
    const baseImgUrl = `${process.env.PUBLIC_URL}/imagenes/`;
    const extensions = ['.jpg', '.png', '.jpeg', '.jfif'];

    const promises = imageNames.map(async (name) => {
        for (const ext of extensions) {
            const url = `${baseImgUrl}${name}${ext}`;
            if (await imageExists(url)) {
                return url;
            }
        }
        return `${process.env.PUBLIC_URL}/imagenes/default.png`; // Imagen por defecto
    });

    return await Promise.all(promises);
};

const useBebidas = () => {
    const [bebidas, setBebidas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBebidas = async () => {
            try {
                const response = await BebidaService.getAllBebidas();
                const imageNames = response.data.map(bebida => bebida.dulce.nombre.toLowerCase().replace(/\s+/g, '-'));
                const validImageUrls = await checkImageUrls(imageNames);

                const bebidasConImagenes = response.data.map((bebida, index) => ({
                    ...bebida,
                    imagenUrl: validImageUrls[index],
                }));

                setBebidas(bebidasConImagenes);
            } catch (err) {
                setError(err);
                console.error("Error al cargar bebidas:", err); // Manejo de errores
            } finally {
                setLoading(false);
            }
        };

        fetchBebidas();
    }, []);

    const venderBebidas = async (ventas) => {
        try {
            const response = await BebidaService.venderBebidas(ventas);
            setBebidas(prevBebidas => 
                prevBebidas.map(bebida => {
                    const venta = ventas.find(v => v.id === bebida.id_bebida);
                    return venta ? { ...bebida, litros: bebida.litros - venta.cantidadVendida } : bebida;
                })
            );
            return response.data;
        } catch (error) {
            console.error("Error al vender bebidas:", error);
            throw error;
        }
    };

    return { bebidas, loading, error, venderBebidas };
};

export default useBebidas;
