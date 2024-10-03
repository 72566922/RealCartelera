// src/services/ComidaService.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/comidas'; // Cambia esto según tu API

const ComidaService = {
  getAllComidas: async () => {
    return axios.get(API_URL); // Asegúrate de que esto esté correcto
  },
  venderComidas: (ventas) => {
    return axios.post(`${API_URL}/vender`, ventas);
  },
};

export default ComidaService;
