package com.proyect.real_cartelera.back_end.service;

import com.proyect.real_cartelera.back_end.model.Asiento;
import com.proyect.real_cartelera.back_end.model.Sala;
import com.proyect.real_cartelera.back_end.repository.AsientoRepository;
import com.proyect.real_cartelera.back_end.repository.SalaRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AsientoService {

    @Autowired
    private AsientoRepository asientoRepository;

    @Autowired
    private SalaRepository salaRepository;

    // Obtener todos los asientos
    public List<Asiento> getAllAsientos() {
        return asientoRepository.findAll();
    }

    // Obtener asientos por ID de sala
    public List<Asiento> getAsientosBySalaId(Long salaId) {
        Sala sala = salaRepository.findById(salaId)
                .orElseThrow(() -> new RuntimeException("Sala no encontrada"));
        return asientoRepository.findBySala(sala);
    }

    // Obtener un asiento por ID
    public Optional<Asiento> getAsientoById(Long id) {
        return asientoRepository.findById(id);
    }

    // Crear un nuevo asiento
    public Asiento createAsiento(Asiento asiento) {
        return asientoRepository.save(asiento);
    }

    // Agregar este método a AsientoService
    public void updateEstadoAsiento(Long asientoId, String nuevoEstado) {
        Asiento asiento = asientoRepository.findById(asientoId)
                .orElseThrow(() -> new RuntimeException("Asiento no encontrado"));

        asiento.setEstado(nuevoEstado);
        asientoRepository.save(asiento);
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

    // Deshabilitar asiento y reducir el número de asientos en la sala
    public Asiento deshabilitarAsiento(Long asientoId) {
        Asiento asiento = asientoRepository.findById(asientoId)
                .orElseThrow(() -> new RuntimeException("Asiento no encontrado"));

        asiento.setEstado("deshabilitado");
        asientoRepository.save(asiento);

        Sala sala = asiento.getSala();
        if (sala.getNum_asientos() > 0) {
            sala.setNum_asientos(sala.getNum_asientos() - 1);
            salaRepository.save(sala);
        }

        return asiento;
    }

    // Vender asientos
    public void venderAsientos(List<Long> asientoIds) {
        for (Long asientoId : asientoIds) {
            Asiento asiento = asientoRepository.findById(asientoId)
                    .orElseThrow(() -> new RuntimeException("Asiento no encontrado"));

            asiento.setEstado("deshabilitado");
            asientoRepository.save(asiento);

            Sala sala = asiento.getSala();
            if (sala.getNum_asientos() > 0) {
                sala.setNum_asientos(sala.getNum_asientos() - 1);
                salaRepository.save(sala);
            }
        }
    }
}
