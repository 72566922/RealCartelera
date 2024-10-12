// src/services/VentaService.js
import axios from 'axios';

const API_URL = 'http://tu_api_url/api/ventas'; // Cambia esto por tu URL de API

const crearVenta = (datosVenta) => {
    return axios.post(API_URL, datosVenta);
};

export default {
    crearVenta,
};
