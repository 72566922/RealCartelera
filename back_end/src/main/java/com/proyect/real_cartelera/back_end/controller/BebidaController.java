package com.proyect.real_cartelera.back_end.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.proyect.real_cartelera.back_end.model.Bebida;
import com.proyect.real_cartelera.back_end.service.BebidaService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/bebidas")
public class BebidaController {

    @Autowired
    private BebidaService bebidaService;

    @GetMapping
    public List<Bebida> getAllBebidas() {
        return bebidaService.getBebidasConUnidadesDisponibles();
    }

    @GetMapping("/{id}")
    public Bebida getBebidaById(@PathVariable Long id) {
        return bebidaService.getBebidaById(id);
    }

    @PostMapping
    public Bebida createBebida(@RequestBody Bebida bebida) {
        return bebidaService.createBebida(bebida);
    }

    @PutMapping("/{id}")
    public Bebida updateBebida(@PathVariable Long id, @RequestBody Bebida bebidaDetails) {
        return bebidaService.updateBebida(id, bebidaDetails);
    }

    @PutMapping("/vender/{id}")
    public ResponseEntity<?> venderBebida(@PathVariable Long id, @RequestBody Map<String, Integer> request) {
        try {
            if (request.get("cantidadVendida") == null) {
                return ResponseEntity.badRequest().body("La cantidadVendida no fue proporcionada");
            }
            int cantidadVendida = request.get("cantidadVendida");
            Bebida bebidaActualizada = bebidaService.venderBebida(id, cantidadVendida);
            return ResponseEntity.ok(bebidaActualizada);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @PostMapping("/vender")
    public ResponseEntity<?> venderBebidas(@RequestBody List<Map<String, Integer>> ventas) {
        try {
            for (Map<String, Integer> venta : ventas) {
                Long id = venta.get("id").longValue();
                int cantidadVendida = venta.get("cantidadVendida");
                bebidaService.venderBebida(id, cantidadVendida);
            }
            return ResponseEntity.ok("Ventas realizadas con éxito");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBebida(@PathVariable Long id) {
        try {
            bebidaService.deleteBebida(id);
            return ResponseEntity.ok("Bebida eliminada con éxito");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
}
