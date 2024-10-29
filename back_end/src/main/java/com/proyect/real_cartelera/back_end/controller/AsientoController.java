package com.proyect.real_cartelera.back_end.controller;

import com.proyect.real_cartelera.back_end.model.Asiento;
import com.proyect.real_cartelera.back_end.service.AsientoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/asientos")
public class AsientoController {

    @Autowired
    private AsientoService asientoService;

    @GetMapping
    public List<Asiento> getAllAsientos() {
        return asientoService.getAllAsientos();
    }

    // Obtener asientos por ID de sala
    @GetMapping("/sala/{salaId}")
    public List<Asiento> getAsientosBySalaId(@PathVariable Long salaId) {
        return asientoService.getAsientosBySalaId(salaId);
    }

    // Obtener un asiento por ID
    @GetMapping("/{id}")
    public Optional<Asiento> getAsientoById(@PathVariable Long id) {
        return asientoService.getAsientoById(id);
    }

    // Obtener todos los asientos habilitados
    @GetMapping("/habilitados")
    public List<Asiento> getAllAsientosHabilitados() {
        return asientoService.getAllAsientos().stream()
                .filter(asiento -> "habilitado".equals(asiento.getEstado())) // Filtra por estado habilitado
                .toList(); // Devuelve la lista filtrada
    }

    // Obtener todos los asientos habilitados por ID de sala
    @GetMapping("/sala/{salaId}/habilitados")
    public List<Asiento> getAsientosHabilitadosBySalaId(@PathVariable Long salaId) {
        return asientoService.getAsientosBySalaId(salaId).stream()
                .filter(asiento -> "habilitado".equals(asiento.getEstado())) // Filtra por estado habilitado
                .toList(); // Devuelve la lista filtrada
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

    // Deshabilitar un asiento
    @PutMapping("/deshabilitar/{asientoId}")
    public Asiento deshabilitarAsiento(@PathVariable Long asientoId) {
        return asientoService.deshabilitarAsiento(asientoId);
    }

    // Vender asientos
    @PutMapping("/vender")
    public ResponseEntity<String> venderAsientos(@RequestBody List<Long> asientoIds) {
        asientoService.venderAsientos(asientoIds);
        return ResponseEntity.ok("Asientos vendidos exitosamente");
    }
}
