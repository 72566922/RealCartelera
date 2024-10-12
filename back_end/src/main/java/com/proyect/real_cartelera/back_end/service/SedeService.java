package com.proyect.real_cartelera.back_end.service;

import com.proyect.real_cartelera.back_end.model.Sede;
import com.proyect.real_cartelera.back_end.repository.SedeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SedeService {

    @Autowired
    private SedeRepository sedeRepository;

    // Obtener todas las sedes
    public List<Sede> findAll() {
        return sedeRepository.findAll();
    }

    // Obtener sedes habilitadas
    public List<Sede> findAllHabilitadas() {
        return sedeRepository.findByEstado("habilitado");
    }

    // Obtener una sede por ID
    public Optional<Sede> findById(Long id) {
        return sedeRepository.findById(id);
    }

    // Guardar una nueva sede
    public Sede save(Sede sede) {
        return sedeRepository.save(sede);
    }

    // Actualizar el estado de una sede
    public Sede updateEstado(Long id, String nuevoEstado) {
        Sede sede = sedeRepository.findById(id)
                                   .orElseThrow(() -> new RuntimeException("Sede no encontrada"));
        sede.setEstado(nuevoEstado);
        return sedeRepository.save(sede);
    }

    // Actualizar una sede existente
    public Sede update(Long id, Sede sede) {
        sede.setId_sede(id);
        return sedeRepository.save(sede);
    }

    // Eliminar una sede por ID
    public void delete(Long id) {
        sedeRepository.deleteById(id);
    }
}
