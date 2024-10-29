// BoletoService.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/boletos';

const BoletoService = {
    getAllBoletos: () => {
        return axios.get(`${API_URL}`)
            .catch(error => {
                console.error("Error obteniendo boletos:", error);
                throw error;
            });
    },

    getBoletosPorIdFuncion: (idFuncion) => {
        return axios.get(`${API_URL}/asientos/funcion/${idFuncion}`)
            .catch(error => {
                console.error("Error obteniendo boletos por id de función:", error);
                throw error;
            });
    },

    getAllNameBoletos: () => {
        return axios.get(`${API_URL}/asientos/id-nombres`)
            .then(response => response.data)
            .catch(error => {
                console.error('Error obteniendo ID y nombres de asientos:', error);
                throw error;
            });
    },

    // Nuevo método para registrar un boleto con logging
    registrarBoleto: (boletoData) => {
        console.log("Datos a registrar en boleto:", boletoData); // Imprime los datos que se están enviando
        return axios.post(`${API_URL}/post`, boletoData)
            .then(response => {
                console.log("Respuesta del servidor al registrar el boleto:", response.data); // Imprime la respuesta exitosa del servidor
                return response.data;
            })
            .catch(error => {
                console.error("Error registrando el boleto:", error.response ? error.response.data : error.message); // Imprime detalles del error
                throw error;
            });
    }
};

export default BoletoService;
