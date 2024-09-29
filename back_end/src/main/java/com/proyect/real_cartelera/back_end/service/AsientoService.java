package com.proyect.real_cartelera.back_end.service;

import com.proyect.real_cartelera.back_end.model.Asiento;
import com.proyect.real_cartelera.back_end.repository.AsientoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AsientoService {

    @Autowired
    private AsientoRepository asientoRepository;

    // Obtener todos los asientos
    public List<Asiento> getAllAsientos() {
        return asientoRepository.findAll();
    }

    // Obtener un asiento por ID
    public Optional<Asiento> getAsientoById(Long id) {
        return asientoRepository.findById(id);
    }

    // Crear un nuevo asiento
    public Asiento createAsiento(Asiento asiento) {
        return asientoRepository.save(asiento);
    }

    // Actualizar un asiento existente
    public Asiento updateAsiento(Long id, Asiento asientoDetails) {
        Asiento asiento = asientoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Asiento no encontrado"));

        asiento.setNombre(asientoDetails.getNombre());
        asiento.setEstado(asientoDetails.getEstado());
        asiento.setSala(asientoDetails.getSala());

        return asientoRepository.save(asiento);
    }

    // Eliminar un asiento por su ID
    public void deleteAsiento(Long id) {
        asientoRepository.deleteById(id);
    }
}
