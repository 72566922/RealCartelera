// src/services/SalaService.js
import axios from 'axios';
import { urlServer } from "./urlServer.js";

const API_URL = `${urlServer}/api/salas`;

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
