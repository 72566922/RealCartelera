// useBoletos.js
import { useState, useEffect } from 'react';
import BoletoService from '../../service/BoletoService';

const useBoletos = () => {
    const [boletos, setBoletos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBoletos = async () => {
            try {
                const response = await BoletoService.getAllBoletos();
                setBoletos(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchBoletos();
    }, []);

    const registrarBoleto = async (boletoData) => {
        try {
            const newBoleto = await BoletoService.registrarBoleto(boletoData);
            setBoletos(prevBoletos => [...prevBoletos, newBoleto]); // Actualiza el estado de boletos con el nuevo boleto
            return newBoleto;
        } catch (error) {
            console.error("Error registrando boleto:", error);
            setError(error); // Guarda el error en el estado si ocurre uno
            throw error;
        }
    };

    return { boletos, loading, error, registrarBoleto };
};

export default useBoletos;
