import axios from 'axios';

const API_URL = 'http://localhost:8080/api/boletos'; // Reemplaza con la URL de tu servidor

const registrarBoleto = async (boleto) => {
    const response = await axios.post(API_URL, boleto);
    return response.data;
};

export default {
    registrarBoleto,
};
