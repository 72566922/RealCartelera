import axios from 'axios';

const API_URL = 'http://192.168.1.34:8080/api/boletos';

const BoletoService = {
  getAllBoletos: () => {
    return axios.get(API_URL);
  },

  venderBoletos: (boletos) => {
    return axios.post(`${API_URL}/vender`, boletos);
  },
};

export default BoletoService;
