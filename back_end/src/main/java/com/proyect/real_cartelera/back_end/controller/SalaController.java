package com.proyect.real_cartelera.back_end.controller;

import com.proyect.real_cartelera.back_end.model.Sala;
import com.proyect.real_cartelera.back_end.service.SalaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/salas")
public class SalaController {

    @Autowired
    private SalaService salaService;

    // Obtener todas las salas
    @GetMapping
    public List<Sala> getAllSalas() {
        return salaService.getAllSalas();
    }

    // Obtener salas habilitadas
    @GetMapping("/habilitadas")
    public List<Sala> getSalasHabilitadas() {
        return salaService.getSalasHabilitadas();
    }

    // Obtener una sala por ID
    @GetMapping("/{id}")
    public Optional<Sala> getSalaById(@PathVariable Long id) {
        return salaService.getSalaById(id);
    }

    // Crear una nueva sala
    @PostMapping
    public Sala createSala(@RequestBody Sala sala) {
        return salaService.createSala(sala);
    }

    // Actualizar una sala existente
    @PutMapping("/{id}")
    public Sala updateSala(@PathVariable Long id, @RequestBody Sala salaDetails) {
        return salaService.updateSala(id, salaDetails);
    }

    // Actualizar el estado de una sala
    @PutMapping("/{id}/estado")
    public Sala updateSalaEstado(@PathVariable Long id, @RequestBody String nuevoEstado) {
        return salaService.updateSalaEstado(id, nuevoEstado);
    }

    // Eliminar una sala
    @DeleteMapping("/{id}")
    public void deleteSala(@PathVariable Long id) {
        salaService.deleteSala(id);
    }
}
