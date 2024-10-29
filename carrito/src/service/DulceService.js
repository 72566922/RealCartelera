// src/services/BebidaService.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/dulces';

const DulceService = {
  getAllDulces: () => {
    return axios.get(API_URL);
  },

};

export default DulceService;
