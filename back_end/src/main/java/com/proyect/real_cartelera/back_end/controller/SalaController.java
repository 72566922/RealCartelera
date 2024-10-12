package com.proyect.real_cartelera.back_end.controller;

import com.proyect.real_cartelera.back_end.model.Asiento;
import com.proyect.real_cartelera.back_end.model.ReservarAsientosRequest;
import com.proyect.real_cartelera.back_end.model.Sala;
import com.proyect.real_cartelera.back_end.service.AsientoService;
import com.proyect.real_cartelera.back_end.service.SalaService;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/salas")
public class SalaController {

    @Autowired
    private SalaService salaService;

    @Autowired
    private AsientoService asientoService;

    // Obtener todas las salas
    @GetMapping
    public List<Sala> getAllSalas() {
        return salaService.getAllSalas();
    }

    // Obtener el número de asientos por ID de la sala
    @GetMapping("/{id}/asientos/numero")
    public ResponseEntity<Long> getNumeroAsientosHabilitadosBySala(@PathVariable Long id) {
        return salaService.getSalaById(id)
                .map(sala -> {
                    // Filtrar los asientos habilitados y contar
                    long numeroAsientosHabilitados = asientoService.getAsientosBySalaId(id)
                            .stream()
                            .filter(asiento -> "habilitado".equals(asiento.getEstado())) // Filtrar por estado
                                                                                         // habilitado
                            .count();
                    return ResponseEntity.ok(numeroAsientosHabilitados);
                })
                .orElse(ResponseEntity.notFound().build()); // Devuelve 404 si la sala no existe
    }

    // Obtener todos los asientos por ID de la sala desde SalaController
    @GetMapping("/{id}/asientos")
    public ResponseEntity<List<Asiento>> getAsientosBySala(@PathVariable Long id) {
        return salaService.getSalaById(id) // Verifica si la sala existe
                .map(sala -> {
                    List<Asiento> asientos = asientoService.getAsientosBySalaId(id);
                    return ResponseEntity.ok(asientos);
                })
                .orElse(ResponseEntity.notFound().build()); // Devuelve 404 si la sala no existe
    }

    // Obtener salas habilitadas
    @GetMapping("/habilitadas")
    public List<Sala> getSalasHabilitadas() {
        return salaService.getSalasHabilitadas();
    }

    // Obtener una sala por ID
    @GetMapping("/{id}")
    public ResponseEntity<Sala> getSalaById(@PathVariable Long id) {
        return salaService.getSalaById(id)
                .map(sala -> ResponseEntity.ok(sala))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/{id}/asientos")
    public ResponseEntity<Void> reservarAsientos(@PathVariable Long id, @RequestBody ReservarAsientosRequest request) {
        Optional<Sala> salaOptional = salaService.getSalaById(id);
        if (!salaOptional.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        Sala sala = salaOptional.get();

        // Deshabilitar asientos seleccionados
        for (Asiento asiento : request.getAsientos()) {
            asientoService.updateEstadoAsiento(asiento.getId_asiento(), "deshabilitado");
        }

        // Actualizar el número de asientos en la sala
        sala.setNum_asientos(sala.getNum_asientos() - request.getTotalAsientos());
        salaService.updateSala(sala.getId_sala(), sala);

        return ResponseEntity.ok().build();
    }

    // Crear una nueva sala
    @PostMapping
    public ResponseEntity<Sala> createSala(@RequestBody Sala sala) {
        Sala createdSala = salaService.createSala(sala);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdSala);
    }

    // Actualizar una sala existente
    @PutMapping("/{id}")
    public ResponseEntity<Sala> updateSala(@PathVariable Long id, @RequestBody Sala salaDetails) {
        Sala updatedSala = salaService.updateSala(id, salaDetails);
        return ResponseEntity.ok(updatedSala);
    }

    // Actualizar el estado de una sala
    @PutMapping("/{id}/estado")
    public ResponseEntity<Sala> updateSalaEstado(@PathVariable Long id, @RequestBody String nuevoEstado) {
        Sala updatedSala = salaService.updateSalaEstado(id, nuevoEstado);
        return ResponseEntity.ok(updatedSala);
    }

    // Eliminar una sala
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSala(@PathVariable Long id) {
        salaService.deleteSala(id);
        return ResponseEntity.noContent().build();
    }
}
