package com.proyect.real_cartelera.back_end.service;

import com.proyect.real_cartelera.back_end.model.Sala;
import com.proyect.real_cartelera.back_end.repository.SalaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SalaService {

    @Autowired
    private SalaRepository salaRepository;

    // Obtener todas las salas
    public List<Sala> getAllSalas() {
        return salaRepository.findAll();
    }

    // Obtener salas habilitadas
    public List<Sala> getSalasHabilitadas() {
        return salaRepository.findAll().stream()
                .filter(sala -> "habilitado".equalsIgnoreCase(sala.getEstado()))
                .toList();
    }

    // Obtener una sala por ID
    public Optional<Sala> getSalaById(Long id) {
        return salaRepository.findById(id);
    }

    // Crear una nueva sala
    public Sala createSala(Sala sala) {
        return salaRepository.save(sala);
    }

    // Actualizar una sala
    public Sala updateSala(Long id, Sala salaDetails) {
        return salaRepository.findById(id).map(sala -> {
            sala.setNombre(salaDetails.getNombre());
            sala.setPiso(salaDetails.getPiso());
            sala.setNum_asientos(salaDetails.getNum_asientos());
            sala.setEstado(salaDetails.getEstado());
            sala.setSede(salaDetails.getSede());
            return salaRepository.save(sala);
        }).orElseThrow(); // Usa la excepción personalizada
    }

    // Actualizar el estado de una sala
    public Sala updateSalaEstado(Long id, String nuevoEstado) {
        return salaRepository.findById(id).map(sala -> {
            sala.setEstado(nuevoEstado);
            return salaRepository.save(sala);
        }).orElseThrow(); // Usa la excepción personalizada
    }

    // Eliminar una sala
    public void deleteSala(Long id) {
        salaRepository.deleteById(id);
    }

    // Obtener el número de asientos de una sala por ID
    public int getNumAsientosBySalaId(Long id) {
        return salaRepository.findById(id)
                .map(Sala::getNum_asientos)
                .orElseThrow(); // Aquí puedes usar una excepción personalizada si la sala no es encontrada
    }
}
