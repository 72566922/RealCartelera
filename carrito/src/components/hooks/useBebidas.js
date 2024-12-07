import { useState, useEffect } from 'react';
import BebidaService from '../../service/BebidaService'; // Importa el servicio que se encarga de la interacción con la API

// Función para verificar si una imagen existe en el servidor
const imageExists = async (url) => {
    return new Promise((resolve) => {
        const img = new Image();  // Crea un objeto de imagen
        img.src = url;  // Asigna la URL de la imagen
        img.onload = () => resolve(true);  // Si la imagen carga correctamente, resuelve como `true`
        img.onerror = () => resolve(false);  // Si la imagen no se carga, resuelve como `false`
    });
};

// Función para verificar las URLs de imágenes y devolver la URL correcta
const checkImageUrls = async (imageNames) => {
    const baseImgUrl = `${process.env.PUBLIC_URL}/build/imagenes/`;  // Ruta base de imágenes
    const extensions = ['.png'];  // Extensiones de imagen posibles

    // Mapea los nombres de las imágenes y verifica si existen en el servidor
    const promises = imageNames.map(async (name) => {
        for (const ext of extensions) {
            const url = `${baseImgUrl}${name}${ext}`;  // Crea la URL con extensión
            if (await imageExists(url)) {  // Si la imagen existe, retorna la URL
                return url;
            }
        }
        // Si no se encuentra la imagen, devuelve una imagen por defecto
        return `${process.env.PUBLIC_URL}/build/imagenes/default.png`;
    });

    // Retorna una lista de URLs válidas para las imágenes
    return await Promise.all(promises);
};

// Hook personalizado para gestionar las bebidas
const useBebidas = () => {
    const [bebidas, setBebidas] = useState([]);  // Estado para almacenar las bebidas
    const [loading, setLoading] = useState(true);  // Estado para el estado de carga
    const [error, setError] = useState(null);  // Estado para manejar errores

    useEffect(() => {
        const fetchBebidas = async () => {
            try {
                // Llama al servicio para obtener todas las bebidas
                const response = await BebidaService.getAllBebidas();
                // Genera una lista de nombres de imágenes basados en los nombres de las bebidas
                const imageNames = response.data.map(bebida => bebida.dulce.nombre.toLowerCase().replace(/\s+/g, '-'));
                // Verifica la existencia de las imágenes
                const validImageUrls = await checkImageUrls(imageNames);

                // Asocia las URLs de las imágenes a las bebidas y actualiza el estado
                const bebidasConImagenes = response.data.map((bebida, index) => ({
                    ...bebida,  // Mantiene los datos originales de la bebida
                    imagenUrl: validImageUrls[index],  // Asocia la URL de la imagen
                }));

                setBebidas(bebidasConImagenes);  // Actualiza el estado de las bebidas
            } catch (err) {
                setError(err);  // Si ocurre un error, se guarda en el estado de error
                console.error("Error al cargar bebidas:", err);  // Se imprime el error en consola
            } finally {
                setLoading(false);  // Se cambia el estado de carga a `false` cuando finaliza la petición
            }
        };

        fetchBebidas();  // Llama a la función para obtener las bebidas cuando el componente se monta
    }, []);  // La dependencia vacía asegura que la función solo se ejecute una vez al montar el componente

    // Función para vender bebidas, actualizando la cantidad de litros disponibles
    const venderBebidas = async (ventas) => {
        try {
            // Llama al servicio para realizar la venta de las bebidas
            const response = await BebidaService.venderBebidas(ventas);
            // Actualiza las cantidades de las bebidas después de la venta
            setBebidas(prevBebidas => 
                prevBebidas.map(bebida => {
                    // Busca la bebida vendida y actualiza la cantidad
                    const venta = ventas.find(v => v.id === bebida.id_bebida);
                    return venta ? { ...bebida, litros: bebida.litros - venta.cantidadVendida } : bebida;
                })
            );
            return response.data;  // Retorna los datos de la venta
        } catch (error) {
            console.error("Error al vender bebidas:", error);  // Manejo de errores
            throw error;  // Lanza el error para manejarlo fuera del hook
        }
    };

    return { bebidas, loading, error, venderBebidas };  // Devuelve los datos y funciones necesarias para el componente
};

export default useBebidas;
