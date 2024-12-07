import axios from 'axios';
import { urlServer } from "./urlServer.js";

const API_URL = `${urlServer}/api/boletos`; // Reemplaza con la URL de tu servidor

const registrarBoleto = async (boleto) => {
    const response = await axios.post(API_URL, boleto);
    return response.data;
};

export default {
    registrarBoleto,
};
