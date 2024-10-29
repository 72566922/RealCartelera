import { useState, useEffect } from 'react';
import BebidaService from '../../service/BebidaService';

const useBebidas = () => {
    const [bebidas, setBebidas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBebidas = async () => {
            try {
                const response = await BebidaService.getAllBebidas();
                setBebidas(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchBebidas();
    }, []);

    const venderBebidas = async (ventas) => {
        try {
            const response = await BebidaService.venderBebidas(ventas);
            // Actualiza el estado local si es necesario
            setBebidas(prevBebidas => 
                prevBebidas.map(bebida => {
                    const venta = ventas.find(v => v.id === bebida.id_bebida);
                    return venta ? { ...bebida, litros: bebida.litros - venta.cantidadVendida } : bebida;
                })
            );
            return response.data; // Puedes devolver la respuesta si es necesario
        } catch (error) {
            console.error("Error al vender bebidas:", error);
            throw error; // Vuelve a lanzar el error para que pueda ser manejado en el componente
        }
    };

    return { bebidas, loading, error, venderBebidas };
};

export default useBebidas;
