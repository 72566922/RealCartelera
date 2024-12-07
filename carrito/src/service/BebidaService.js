// Importando axios para hacer peticiones HTTP
import axios from 'axios';
import { urlServer } from "./urlServer.js";

// Definiendo la URL base para las peticiones a la API de bebidas
const API_URL = `${urlServer}/api/bebidas`;

// Definimos el objeto BebidaService que contiene las funciones para interactuar con la API
const BebidaService = {
    // Función para obtener todas las bebidas
    getAllBebidas: () => {
        // Realiza una solicitud GET a la API para obtener todas las bebidas
        return axios.get(API_URL);
    },

    // Función asincrónica para vender bebidas
    venderBebidas: async (ventas) => {
        // Imprime en consola los datos que se van a enviar para vender las bebidas
        console.log('Datos a enviar para vender bebidas:', ventas);
        try {
            // Realiza una solicitud POST a la API para vender las bebidas, pasando los datos de las ventas
            const response = await axios.post(`${API_URL}/vender`, ventas);
            // Si la solicitud es exitosa, devuelve los datos de la respuesta
            return response.data;
        } catch (error) {
            // Si ocurre un error durante la solicitud, maneja el error
            // Si la respuesta de error contiene información adicional, se muestra en consola
            console.error('Error al vender bebidas:', error.response ? error.response.data : error.message);
            // Lanza el error para que pueda ser manejado en el lugar donde se llama a esta función
            throw error;
        }
    },
    
};

// Exporta el objeto BebidaService para que pueda ser utilizado en otras partes de la aplicación
export default BebidaService;
