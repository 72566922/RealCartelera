// src/services/BebidaService.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/bebidas';

const BebidaService = {
  getAllBebidas: () => {
    return axios.get(API_URL);
  },

  venderBebidas: (ventas) => {
    return axios.post(`${API_URL}/vender`, ventas);
  },
};

export default BebidaService;
