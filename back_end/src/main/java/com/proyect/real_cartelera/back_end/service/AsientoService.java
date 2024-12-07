package com.proyect.real_cartelera.back_end.service;

import com.proyect.real_cartelera.back_end.model.Asiento;
import com.proyect.real_cartelera.back_end.model.Sala;
import com.proyect.real_cartelera.back_end.repository.AsientoRepository;
import com.proyect.real_cartelera.back_end.repository.SalaRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service // Marca esta clase como un componente de servicio en Spring.
public class AsientoService {

    @Autowired // Inyección de dependencias para acceder al repositorio de asientos.
    private AsientoRepository asientoRepository;

    @Autowired // Inyección de dependencias para acceder al repositorio de salas.
    private SalaRepository salaRepository;

    // Obtiene todos los asientos.
    public List<Asiento> getAllAsientos() {
        return asientoRepository.findAll();
    }

    // Obtiene los asientos de una sala por su ID.
    public List<Asiento> getAsientosBySalaId(Long salaId) {
        Sala sala = salaRepository.findById(salaId)
                .orElseThrow(() -> new RuntimeException("Sala no encontrada")); // Maneja el caso donde la sala no existe.
        return asientoRepository.findBySala(sala);
    }

    // Obtiene un asiento por su ID.
    public Optional<Asiento> getAsientoById(Long id) {
        return asientoRepository.findById(id);
    }

    // Crea un nuevo asiento.
    public Asiento createAsiento(Asiento asiento) {
        return asientoRepository.save(asiento);
    }

    // Actualiza el estado de un asiento (ej.: "Reservado").
    public void updateEstadoAsiento(Long asientoId, String nuevoEstado) {
        Asiento asiento = asientoRepository.findById(asientoId)
                .orElseThrow(() -> new RuntimeException("Asiento no encontrado"));

        asiento.setEstado(nuevoEstado); // Cambia el estado del asiento.
        asientoRepository.save(asiento); // Guarda los cambios.
    }

    // Actualiza un asiento existente.
    public Asiento updateAsiento(Long id, Asiento asientoDetails) {
        Asiento asiento = asientoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Asiento no encontrado"));

        asiento.setNombre(asientoDetails.getNombre()); // Actualiza el nombre.
        asiento.setEstado(asientoDetails.getEstado()); // Actualiza el estado.
        asiento.setSala(asientoDetails.getSala()); // Actualiza la sala.

        return asientoRepository.save(asiento); // Guarda los cambios.
    }

    // Elimina un asiento por su ID.
    public void deleteAsiento(Long id) {
        asientoRepository.deleteById(id);
    }

    // Deshabilita un asiento (cambia el estado y reduce el número de asientos en la sala).
    public Asiento deshabilitarAsiento(Long asientoId) {
        Asiento asiento = asientoRepository.findById(asientoId)
                .orElseThrow(() -> new RuntimeException("Asiento no encontrado"));

        asiento.setEstado("deshabilitado"); // Cambia el estado.
        asientoRepository.save(asiento);

        Sala sala = asiento.getSala();
        if (sala.getNum_asientos() > 0) { // Reduce el número de asientos disponibles.
            sala.setNum_asientos(sala.getNum_asientos() - 1);
            salaRepository.save(sala);
        }

        return asiento;
    }

    // Marca varios asientos como vendidos.
    public void venderAsientos(List<Long> asientoIds) {
        for (Long asientoId : asientoIds) {
            Asiento asiento = asientoRepository.findById(asientoId)
                    .orElseThrow(() -> new RuntimeException("Asiento no encontrado"));

            asiento.setEstado("deshabilitado"); // Cambia el estado a deshabilitado.
            asientoRepository.save(asiento);

            Sala sala = asiento.getSala();
            if (sala.getNum_asientos() > 0) { // Actualiza el número de asientos disponibles.
                sala.setNum_asientos(sala.getNum_asientos() - 1);
                salaRepository.save(sala);
            }
        }
    }
}
