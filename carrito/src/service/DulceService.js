// src/services/BebidaService.js
import axios from 'axios';
import { urlServer } from "./urlServer.js";

const API_URL = `${urlServer}/api/dulces`;

const DulceService = {
  getAllDulces: () => {
    return axios.get(API_URL);
  },

};

export default DulceService;
