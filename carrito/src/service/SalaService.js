// src/services/SalaService.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/salas';

const SalaService = {
    getAllSalas: () => {
        return axios.get(API_URL)
            .catch(error => {
                console.error("Error obteniendo salas:", error);
                throw error;
            });
    },
};

export default SalaService;
