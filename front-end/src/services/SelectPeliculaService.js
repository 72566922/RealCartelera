// src/services/SelectPeliculaService.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/peliculas';

const SelectPeliculaService = {
  // Obtener todas las películas
  getAllPeliculas: () => {
    return axios.get(API_URL);
  },

  // Obtener películas filtradas por categoría
  getPeliculasByCategoria: (categoriaId) => {
    return axios.get(`${API_URL}?categoriaId=${categoriaId}`);
  },

  // Obtener películas habilitadas
  getPeliculasHabilitadas: () => {
    return axios.get(`${API_URL}/habilitadas`);
  },

  // Obtener película por ID
  getPeliculaById: (id) => {
    return axios.get(`${API_URL}/${id}`);
  },

  // Crear una nueva película
  createPelicula: (pelicula) => {
    return axios.post(API_URL, pelicula);
  },

  // Actualizar una película existente
  updatePelicula: (id, peliculaDetails) => {
    return axios.put(`${API_URL}/${id}`, peliculaDetails);
  },

  // Actualizar el estado de una película
  updatePeliculaEstado: (id, nuevoEstado) => {
    return axios.put(`${API_URL}/${id}/estado`, { nuevoEstado });
  },

  // Eliminar una película por ID
  deletePelicula: (id) => {
    return axios.delete(`${API_URL}/${id}`);
  },
};

export default SelectPeliculaService;
