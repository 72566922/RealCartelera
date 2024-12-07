import { urlServer } from "./urlServer.js";


// AsientoService.js
// Se importa la librería axios para realizar peticiones HTTP.
import axios from 'axios';

// Definimos la URL base de la API que se usará para acceder a los servicios de salas y asientos.
const API_URL = `${urlServer}/api/salas`;

// Se define el objeto AsientoService que contiene funciones para interactuar con el backend.
const AsientoService = {
    // Función para obtener todos los asientos disponibles.
    getAllAsientos: () => {
        return axios.get(`${API_URL}/asientos`)  // Realiza una solicitud GET a la API para obtener todos los asientos.
            .catch(error => {  // Captura cualquier error que ocurra durante la solicitud.
                console.error("Error obteniendo asientos:", error);  // Muestra un mensaje de error en la consola.
                throw error;  // Lanza el error para que se maneje en el lugar donde se llame la función.
            });
    },

    // Función para realizar una venta de asientos, enviando la información de la venta al backend.
    venderAsientos: (ventas) => {
        return axios.post(`${API_URL}/vender`, ventas)  // Realiza una solicitud POST para vender los asientos.
            .catch(error => {  // Captura cualquier error que ocurra durante la solicitud.
                console.error("Error vendiendo asientos:", error);  // Muestra un mensaje de error en la consola.
                throw error;  // Lanza el error para que se maneje en el lugar donde se llame la función.
            });
    },

    // Función para obtener los asientos de una sala específica, dado el ID de la sala.
    getAsientosPorSala: (idSala) => {
        return axios.get(`${API_URL}/${idSala}/asientos`)  // Realiza una solicitud GET para obtener los asientos de una sala específica.
            .catch(error => {  // Captura cualquier error que ocurra durante la solicitud.
                console.error(`Error obteniendo asientos por sala ${idSala}:`, error);  // Muestra un mensaje de error en la consola con el ID de la sala.
                throw error;  // Lanza el error para que se maneje en el lugar donde se llame la función.
            });
    },
};

// Se exporta el objeto AsientoService para que pueda ser utilizado en otras partes de la aplicación.
export default AsientoService;
