// Importando axios para hacer solicitudes HTTP
import axios from 'axios';

// Definiendo la URL base para las peticiones a la API de boletos
const API_URL = 'http://localhost:8080/api/boletos';

// Definimos el objeto BoletoService que contiene las funciones para interactuar con la API
const BoletoService = {
    // Función para obtener todos los boletos
    getAllBoletos: () => {
        // Realiza una solicitud GET a la API para obtener todos los boletos
        return axios.get(`${API_URL}`)
            .catch(error => {
                // Si ocurre un error, se imprime en consola
                console.error("Error obteniendo boletos:", error);
                // Lanza el error para que pueda ser manejado en el lugar donde se llama a esta función
                throw error;
            });
    },

    // Función para obtener boletos por ID de función
    getBoletosPorIdFuncion: (idFuncion) => {
        // Realiza una solicitud GET para obtener los boletos relacionados con una función específica
        return axios.get(`${API_URL}/asientos/funcion/${idFuncion}`)
            .catch(error => {
                // Si ocurre un error, se imprime en consola
                console.error("Error obteniendo boletos por id de función:", error);
                // Lanza el error para que pueda ser manejado en el lugar donde se llama a esta función
                throw error;
            });
    },

    // Función para obtener los nombres e IDs de los boletos
    getAllNameBoletos: () => {
        // Realiza una solicitud GET a la API para obtener los IDs y nombres de los asientos
        return axios.get(`${API_URL}/asientos/id-nombres`)
            .then(response => response.data)  // Devuelve los datos de la respuesta
            .catch(error => {
                // Si ocurre un error, se imprime en consola
                console.error('Error obteniendo ID y nombres de asientos:', error);
                // Lanza el error para que pueda ser manejado en el lugar donde se llama a esta función
                throw error;
            });
    },

    // Nuevo método para registrar un boleto con logging
    registrarBoleto: (boletoData) => {
        // Imprime en consola los datos que se están enviando para registrar el boleto
        console.log("Datos a registrar en boleto:", boletoData); 
        // Realiza una solicitud POST a la API para registrar un nuevo boleto
        return axios.post(`${API_URL}/post`, boletoData)
            .then(response => {
                // Si la solicitud es exitosa, imprime la respuesta del servidor en consola
                console.log("Respuesta del servidor al registrar el boleto:", response.data);
                // Devuelve los datos de la respuesta
                return response.data;
            })
            .catch(error => {
                // Si ocurre un error durante la solicitud, maneja el error
                // Si la respuesta de error contiene información adicional, se muestra en consola
                console.error("Error registrando el boleto:", error.response ? error.response.data : error.message);
                // Lanza el error para que pueda ser manejado en el lugar donde se llama a esta función
                throw error;
            });
    }
};

// Exporta el objeto BoletoService para que pueda ser utilizado en otras partes de la aplicación
export default BoletoService;
