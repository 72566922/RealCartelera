import axios from 'axios';

const API_URL = 'http://localhost:8080/api/comidas'; // Cambia esto según tu API

const ComidaService = {
    getAllComidas: async () => {
        return axios.get(API_URL); // Asegúrate de que esto esté correcto
    },

    venderComidas: async (ventas) => {
        console.log('Datos a enviar para vender comidas:', ventas); // Agrega este log para verificar
        try {
            const response = await axios.post(`${API_URL}/vender`, ventas);
            return response.data; // Retorna los datos de la respuesta
        } catch (error) {
            console.error("Error al vender comidas:", error); // Log de error
            throw error; // Propagar el error para manejo posterior
        }
    },
};

export default ComidaService;
