import axios from "axios";

const API_URL = 'http://localhost:8080/api/funciones';

const FuncionService = {

    // Obtener todas las funciones
    getAllFunciones: () => {
        return axios.get(API_URL);
    },

    // Obtener funciones por sala
    getFuncionesPorSala: (idSala) => {
        return axios.get(`${API_URL}/sala`, {
            params: { idSala }
        });
    },

    // Obtener funciones por película
    getFuncionesPorPelicula: (idPelicula) => {
        return axios.get(`${API_URL}/pelicula`, {
            params: { idPelicula }
        });
    },

    getPeliculasFromFunciones: () => {
        return axios.get(`${API_URL}/peliculas`);
    },

    // Obtener una función por ID
    getFuncionById: (id) => {
        return axios.get(`${API_URL}/${id}`);
    },

    // Crear una nueva función
    createFuncion: (funcion) => {
        return axios.post(API_URL, funcion);
    },

    // Actualizar una función
    updateFuncion: (id, funcion) => {
        return axios.put(`${API_URL}/${id}`, funcion);
    },

    // Eliminar una función
    deleteFuncion: (id) => {
        return axios.delete(`${API_URL}/${id}`);
    },

    // Obtener el ID de la sala por el ID de la función
    getIdSalaByFuncionId: (id) => {
        return axios.get(`${API_URL}/sala/${id}`);
    }
};

export default FuncionService;
