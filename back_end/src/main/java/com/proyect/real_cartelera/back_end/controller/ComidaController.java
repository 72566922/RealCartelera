package com.proyect.real_cartelera.back_end.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.proyect.real_cartelera.back_end.model.Comida;
import com.proyect.real_cartelera.back_end.service.ComidaService;

@RestController
@RequestMapping("/api/comidas") // Cambiado a plural para consistencia
public class ComidaController {

    @Autowired
    private ComidaService comidaService;

    // Obtener todas las comidas
    @GetMapping
    public List<Comida> getAllComidas() {
        return comidaService.getAllComidas();
    }

    // Obtener comida por ID
    @GetMapping("/{id}")
    public Comida getComidaById(@PathVariable Long id) {
        return comidaService.getComidaById(id);
    }

    // Crear una nueva comida
    @PostMapping
    public Comida createComida(@RequestBody Comida comida) {
        return comidaService.createComida(comida);
    }

    // Actualizar una comida existente
    @PutMapping("/{id}")
    public Comida updateComida(@PathVariable Long id, @RequestBody Comida comidaDetails) {
        return comidaService.updateComida(id, comidaDetails);
    }

    // Vender una comida por ID
    @PutMapping("/vender/{id}")
    public ResponseEntity<?> venderComida(@PathVariable Long id, @RequestBody Map<String, Integer> request) {
        try {
            if (request.get("cantidadVendida") == null) {
                return ResponseEntity.badRequest().body("La cantidadVendida no fue proporcionada");
            }
            int cantidadVendida = request.get("cantidadVendida");
            Comida comidaActualizada = comidaService.venderComida(id, cantidadVendida);
            return ResponseEntity.ok(comidaActualizada);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    // Vender múltiples comidas
    @PostMapping("/vender")
    public ResponseEntity<?> venderComidas(@RequestBody List<Map<String, Integer>> ventas) {
        try {
            for (Map<String, Integer> venta : ventas) {
                Long id = venta.get("id").longValue();
                int cantidadVendida = venta.get("cantidadVendida");
                comidaService.venderComida(id, cantidadVendida);
            }
            return ResponseEntity.ok("Ventas realizadas con éxito");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    // Eliminar una comida
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteComida(@PathVariable Long id) {
        try {
            comidaService.deleteComida(id);
            return ResponseEntity.ok("Comida eliminada con éxito");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
}
