package com.proyect.real_cartelera.back_end.service;

import com.proyect.real_cartelera.back_end.model.Funcion;
import com.proyect.real_cartelera.back_end.model.Pelicula;
import com.proyect.real_cartelera.back_end.model.Sala;
import com.proyect.real_cartelera.back_end.repository.FuncionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FuncionService {

    @Autowired
    private FuncionRepository funcionRepository;

    public List<Funcion> getAllFunciones() {
        return funcionRepository.findAll();
    }

    public Optional<Funcion> getFuncionById(Long id) {
        return funcionRepository.findById(id);
    }

    public List<Funcion> getFuncionesPorPelicula(Pelicula pelicula) {
        return funcionRepository.findByPelicula(pelicula);
    }

    public Funcion createFuncion(Funcion funcion) {
        return funcionRepository.save(funcion);
    }

    public Funcion updateFuncion(Long id, Funcion funcionDetails) {
        Funcion funcion = getFuncionById(id).orElseThrow(() -> new RuntimeException("Funcion no encontrada"));
        // Actualiza los detalles de la función
        funcion.setSala(funcionDetails.getSala());
        funcion.setPelicula(funcionDetails.getPelicula());
        funcion.setHora(funcionDetails.getHora());
        return funcionRepository.save(funcion);
    }

    public void deleteFuncion(Long id) {
        funcionRepository.deleteById(id);
    }

    public List<Funcion> getFuncionesPorSala(Sala sala) {
        return funcionRepository.findBySala(sala);
    }
}
