// src/services/CategoriaService.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/categorias';

const CategoriaService = {
  getCategorias: async () => { // Cambiado de getAllCategorias a getCategorias
    const response = await axios.get(API_URL);
    return response.data; // Devuelve solo los datos
  },
};

export default CategoriaService;
