import axios from 'axios';

const API_URL = 'http://localhost:8080/api/bebidas';

const BebidaService = {
    getAllBebidas: () => {
        return axios.get(API_URL);
    },

    venderBebidas: async (ventas) => {
        console.log('Datos a enviar para vender bebidas:', ventas);
        try {
            const response = await axios.post(`${API_URL}/vender`, ventas);
            return response.data;
        } catch (error) {
            console.error('Error al vender bebidas:', error.response ? error.response.data : error.message);
            throw error;
        }
    },
    
};

export default BebidaService;
