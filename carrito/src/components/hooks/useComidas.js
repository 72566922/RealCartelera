import { useState, useEffect } from 'react';
import ComidaService from '../../service/ComidaService';

const useComidas = () => {
    const [comidas, setComidas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchComidas = async () => {
            try {
                const response = await ComidaService.getAllComidas();
                setComidas(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchComidas();
    }, []);

    const venderComidas = async (ventas) => {
        try {
            const response = await ComidaService.venderComidas(ventas);
            // Actualiza el estado local si es necesario
            setComidas(prevComidas => 
                prevComidas.map(comida => {
                    const venta = ventas.find(v => v.id === comida.id_comida);
                    return venta ? { ...comida, gramos: comida.gramos - venta.cantidadVendida } : comida;
                })
            );
            return response.data; // Puedes devolver la respuesta si es necesario
        } catch (error) {
            console.error("Error al vender comidas:", error);
            throw error; // Vuelve a lanzar el error para que pueda ser manejado en el componente
        }
    };

    return { comidas, loading, error, venderComidas };
};

export default useComidas;
