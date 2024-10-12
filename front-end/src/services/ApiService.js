// src/services/ApiService.js
import FuncionService from './FuncionService';
import AsientoService from './AsientoService';
import BebidaService from './BebidaService';
import ComidaService from './ComidaService';

const ApiService = {
    // Servicios de funciones
    getAllFunciones: () => {
        return FuncionService.getAllFunciones();
    },

    getFuncionesPorSala: (idSala) => {
        return FuncionService.getFuncionesPorSala(idSala);
    },

    getFuncionesPorPelicula: (idPelicula) => {
        return FuncionService.getFuncionesPorPelicula(idPelicula);
    },

    getFuncionById: (id) => {
        return FuncionService.getFuncionById(id);
    },

    createFuncion: (funcion) => {
        return FuncionService.createFuncion(funcion);
    },

    updateFuncion: (id, funcion) => {
        return FuncionService.updateFuncion(id, funcion);
    },

    deleteFuncion: (id) => {
        return FuncionService.deleteFuncion(id);
    },

    getIdSalaByFuncionId: (id) => {
        return FuncionService.getIdSalaByFuncionId(id);
    },

    // Servicios de asientos
    getAllAsientos: () => {
        return AsientoService.getAllAsientos();
    },

    venderAsientos: (ventas) => {
        return AsientoService.venderAsientos(ventas);
    },

    getAsientosPorSala: (idSala) => {
        return AsientoService.getAsientosPorSala(idSala);
    },

    // Servicios de bebidas
    getAllBebidas: () => {
        return BebidaService.getAllBebidas();
    },

    // Servicios de comidas
    getAllComidas: () => {
        return ComidaService.getAllComidas();
    },
};

export default ApiService;
