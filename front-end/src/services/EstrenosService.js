// src/services/EstrenosService.js
import axios from 'axios';

const API_URL = 'http://192.168.1.34:8080/api/peliculas';

const EstrenoService = {
  getAllEstrenos: () => {
    return axios.get(API_URL);
  },
};

export default EstrenoService;
