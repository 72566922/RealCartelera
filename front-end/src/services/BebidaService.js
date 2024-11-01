// src/services/BebidaService.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/bebidas';

const BebidaService = {
  getAllBebidas: () => {
    return axios.get(API_URL);
  },

  venderBebidas: (ventas) => {
    // Mostrar en consola los datos de ventas antes de enviarlos
    console.log("Datos enviados para vender bebidas:", ventas);
    
    return axios.post(`${API_URL}/vender`, ventas);
  },
};

export default BebidaService;
