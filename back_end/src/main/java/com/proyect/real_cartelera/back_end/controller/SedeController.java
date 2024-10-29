package com.proyect.real_cartelera.back_end.controller;

import com.proyect.real_cartelera.back_end.model.Sede;
import com.proyect.real_cartelera.back_end.service.SedeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sedes")
public class SedeController {

    @Autowired
    private SedeService sedeService;

    // Obtener todas las sedes
    @GetMapping
    public List<Sede> getAllSedes() {
        return sedeService.findAll();
    }

    // Obtener todas las sedes habilitadas
    @GetMapping("/habilitadas")
    public List<Sede> getAllSedesHabilitadas() {
        return sedeService.findAllHabilitadas();
    }

    // Obtener una sede por ID
    @GetMapping("/{id}")
    public Sede getSedeById(@PathVariable Long id) {
        return sedeService.findById(id)
                          .orElseThrow(() -> new RuntimeException("Sede no encontrada"));
    }

    // Crear una nueva sede
    @PostMapping
    public Sede createSede(@RequestBody Sede sede) {
        return sedeService.save(sede);
    }

    // Actualizar el estado de una sede
    @PutMapping("/{id}/estado")
    public Sede updateSedeEstado(@PathVariable Long id, @RequestBody String nuevoEstado) {
        return sedeService.updateEstado(id, nuevoEstado);
    }

    // Actualizar una sede existente
    @PutMapping("/{id}")
    public Sede updateSede(@PathVariable Long id, @RequestBody Sede sedeDetails) {
        return sedeService.update(id, sedeDetails);
    }

    // Eliminar una sede
    @DeleteMapping("/{id}")
    public void deleteSede(@PathVariable Long id) {
        sedeService.delete(id);
    }
}
