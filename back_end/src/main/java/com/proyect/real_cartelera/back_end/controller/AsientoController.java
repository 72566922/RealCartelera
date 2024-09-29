package com.proyect.real_cartelera.back_end.controller;

import com.proyect.real_cartelera.back_end.model.Asiento;
import com.proyect.real_cartelera.back_end.service.AsientoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/asientos")
public class AsientoController {

    @Autowired
    private AsientoService asientoService;

    // Obtener todos los asientos
    @GetMapping
    public List<Asiento> getAllAsientos() {
        return asientoService.getAllAsientos();
    }

    // Obtener un asiento por ID
    @GetMapping("/{id}")
    public Optional<Asiento> getAsientoById(@PathVariable Long id) {
        return asientoService.getAsientoById(id);
    }

    // Crear un nuevo asiento
    @PostMapping
    public Asiento createAsiento(@RequestBody Asiento asiento) {
        return asientoService.createAsiento(asiento);
    }

    // Actualizar un asiento existente
    @PutMapping("/{id}")
    public Asiento updateAsiento(@PathVariable Long id, @RequestBody Asiento asientoDetails) {
        return asientoService.updateAsiento(id, asientoDetails);
    }

    // Eliminar un asiento
    @DeleteMapping("/{id}")
    public void deleteAsiento(@PathVariable Long id) {
        asientoService.deleteAsiento(id);
    }
}
