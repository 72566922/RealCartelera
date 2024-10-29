// AsientoService.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/salas';

const AsientoService = {
    getAllAsientos: () => {
        return axios.get(`${API_URL}/asientos`)
            .catch(error => {
                console.error("Error obteniendo asientos:", error);
                throw error;
            });
    },

    venderAsientos: (ventas) => {
        return axios.post(`${API_URL}/vender`, ventas)
            .catch(error => {
                console.error("Error vendiendo asientos:", error);
                throw error;
            });
    },

    getAsientosPorSala: (idSala) => {
        return axios.get(`${API_URL}/${idSala}/asientos`)
            .catch(error => {
                console.error(`Error obteniendo asientos por sala ${idSala}:`, error);
                throw error;
            });
    },
};

export default AsientoService;