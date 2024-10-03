import axios from 'axios';

const API_URL = 'http://localhost:8080/api/asientos';

const AsientoService = {
  getAllAsientos: () => {
    return axios.get(API_URL);
  },

  venderAsientos: (ventas) => {
    return axios.post(`${API_URL}/vender`, ventas);
  },
};

export default AsientoService;
