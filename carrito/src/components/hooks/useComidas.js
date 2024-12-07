// useComidas.js
import { useState, useEffect } from 'react'; // Importa los hooks de React para manejar el estado y los efectos secundarios
import ComidaService from '../../service/ComidaService'; // Importa el servicio encargado de la interacción con la API para las comidas

// Función para verificar si una imagen existe en una URL específica
const imageExists = async (url) => {
    return new Promise((resolve) => {
        const img = new Image(); // Crea una nueva instancia de imagen
        img.src = url; // Establece la URL de la imagen
        img.onload = () => resolve(true); // Si la imagen se carga correctamente, resuelve la promesa como verdadera
        img.onerror = () => resolve(false); // Si ocurre un error al cargar la imagen, resuelve la promesa como falsa
    });
};

// Hook personalizado para gestionar las comidas
const useComidas = () => {
    // Definir los estados para las comidas, el estado de carga y el manejo de errores
    const [comidas, setComidas] = useState([]);  // Estado para almacenar la lista de comidas
    const [loading, setLoading] = useState(true);  // Estado para manejar la carga de datos
    const [error, setError] = useState(null);  // Estado para manejar errores
    const defaultImageUrl = `${process.env.PUBLIC_URL}/build/imagenes/default.png`; // URL de imagen por defecto

    // El hook useEffect se utiliza para realizar una acción al montar el componente (como cargar las comidas)
    useEffect(() => {
        // Función asincrónica para obtener todas las comidas desde la API
        const fetchComidas = async () => {
            try {
                // Llama al servicio para obtener las comidas
                const response = await ComidaService.getAllComidas();

                // Verificar y asignar imágenes
                const baseImgUrl = `${process.env.PUBLIC_URL}/build/imagenes/`; // URL base para las imágenes
                const extensions = ['.png']; // Extensiones de imagen que se verificarán

                // Usa Promise.all para procesar todas las comidas y asignarles una imagen válida
                const comidasConImagenes = await Promise.all(
                    response.data.map(async (comida) => {
                        const imageName = comida.dulce.nombre.toLowerCase().replace(/\s+/g, '-'); // Formatea el nombre de la comida para usarlo en la imagen
                        let validImageUrl = defaultImageUrl; // Asigna la imagen por defecto si no se encuentra una imagen válida

                        // Verifica si alguna de las posibles imágenes con extensiones existe
                        for (const ext of extensions) {
                            const exists = await imageExists(`${baseImgUrl}${imageName}${ext}`);
                            if (exists) {
                                validImageUrl = `${baseImgUrl}${imageName}${ext}`; // Asigna la imagen válida si se encuentra
                                break;
                            }
                        }

                        // Devuelve la comida con la URL de la imagen válida
                        return { ...comida, imagenUrl: validImageUrl };
                    })
                );

                // Actualiza el estado de comidas con la lista de comidas que ahora incluye las imágenes válidas
                setComidas(comidasConImagenes);
            } catch (err) {
                // Si ocurre un error durante la obtención de las comidas, guarda el error en el estado
                setError(err);
            } finally {
                // Establece el estado de carga como falso después de la obtención de los datos
                setLoading(false);
            }
        };

        // Llama a la función para obtener las comidas cuando el componente se monte
        fetchComidas();
    }, [defaultImageUrl]); // El efecto se ejecuta nuevamente si cambia la URL de la imagen por defecto

    // Función para vender comidas, actualizando la cantidad de gramos de las comidas después de una venta
    const venderComidas = async (ventas) => {
        try {
            // Llama al servicio para registrar la venta de las comidas
            const response = await ComidaService.venderComidas(ventas);
            // Actualiza el estado de las comidas reduciendo los gramos vendidos
            setComidas(prevComidas => 
                prevComidas.map(comida => {
                    const venta = ventas.find(v => v.id === comida.id_comida); // Busca la venta correspondiente a la comida
                    return venta ? { ...comida, gramos: comida.gramos - venta.cantidadVendida } : comida; // Si se encuentra una venta, reduce la cantidad de gramos
                })
            );
            return response.data; // Retorna los datos de la respuesta de la venta
        } catch (error) {
            // Si ocurre un error al vender las comidas, imprime el error en consola y lo lanza
            console.error("Error al vender comidas:", error);
            throw error;
        }
    };

    // Devuelve el estado actual de las comidas, el estado de carga, el error y la función para vender comidas
    return { comidas, loading, error, venderComidas };
};

export default useComidas;  // Exporta el hook para que pueda ser utilizado en otros componentes
