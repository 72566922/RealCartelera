package com.proyect.real_cartelera.back_end.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.proyect.real_cartelera.back_end.model.Dulce;
import com.proyect.real_cartelera.back_end.service.DulceService;

@RestController
@RequestMapping("/api/dulces")
public class DulceController {

    @Autowired
    private DulceService dulceService;

    // Obtener todos los dulces
    @GetMapping
    public List<Dulce> getAllDulces() {
        return dulceService.getAllDulces();
    }

    // Obtener todos los dulces habilitados
    @GetMapping("/habilitados")
    public List<Dulce> getAllDulcesHabilitados() {
        return dulceService.getAllDulcesHabilitados();
    }

    // Obtener un dulce por ID
    @GetMapping("/{id}")
    public Dulce getDulceById(@PathVariable Long id) {
        return dulceService.getDulceById(id);
    }

    // Crear un nuevo dulce
    @PostMapping
    public Dulce createDulce(@RequestBody Dulce dulce) {
        return dulceService.createDulce(dulce);
    }

    // Actualizar el estado de un dulce
    @PutMapping("/{id}/estado")
    public Dulce updateDulceEstado(@PathVariable Long id, @RequestBody String nuevoEstado) {
        return dulceService.updateDulceEstado(id, nuevoEstado);
    }

    // Actualizar un dulce existente
    @PutMapping("/{id}")
    public Dulce updateDulce(@PathVariable Long id, @RequestBody Dulce dulceDetails) {
        return dulceService.updateDulce(id, dulceDetails);
    }

    // Eliminar un dulce
    @DeleteMapping("/{id}")
    public void deleteDulce(@PathVariable Long id) {
        dulceService.deleteDulce(id);
    }
}
