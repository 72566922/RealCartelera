package com.proyect.real_cartelera.back_end.service;

import com.proyect.real_cartelera.back_end.model.Funcion;
import com.proyect.real_cartelera.back_end.repository.FuncionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FuncionService {

    @Autowired
    private FuncionRepository funcionRepository;

    // Método para obtener todas las funciones
    public List<Funcion> getAllFunciones() {
        return funcionRepository.findAll();
    }

    // Método para obtener una función por su ID
    public Optional<Funcion> getFuncionById(Long id) {
        return funcionRepository.findById(id);
    }

    // Método para crear una nueva función
    public Funcion createFuncion(Funcion funcion) {
        return funcionRepository.save(funcion);
    }

    // Método para actualizar una función existente
    public Funcion updateFuncion(Long id, Funcion funcionDetails) {
        Funcion funcion = funcionRepository.findById(id).orElseThrow(() -> new RuntimeException("Funcion no encontrada"));
        funcion.setHora(funcionDetails.getHora());
        funcion.setPrecio(funcionDetails.getPrecio());
        funcion.setPelicula(funcionDetails.getPelicula());
        return funcionRepository.save(funcion);
    }

    // Método para eliminar una función
    public void deleteFuncion(Long id) {
        funcionRepository.deleteById(id);
    }
}
