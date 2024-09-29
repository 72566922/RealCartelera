package com.proyect.real_cartelera.back_end.controller;

import com.proyect.real_cartelera.back_end.model.Rol;
import com.proyect.real_cartelera.back_end.service.RolService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/roles")
public class RolController {

    @Autowired
    private RolService rolService;

    // Obtener todos los roles
    @GetMapping
    public List<Rol> getAllRoles() {
        return rolService.getAllRoles();
    }

    // Obtener un rol por ID
    @GetMapping("/{id}")
    public Optional<Rol> getRolById(@PathVariable Long id) {
        return rolService.getRolById(id);
    }

    // Crear un nuevo rol
    @PostMapping
    public Rol createRol(@RequestParam String nombre, @RequestParam String estado) {
        return rolService.createRol(nombre, estado);
    }

    // Actualizar un rol existente
    @PutMapping("/{id}")
    public Rol updateRol(@PathVariable Long id,
                         @RequestParam String nombre,
                         @RequestParam String estado) {
        return rolService.updateRol(id, nombre, estado);
    }

    // Eliminar un rol
    @DeleteMapping("/{id}")
    public void deleteRol(@PathVariable Long id) {
        rolService.deleteRol(id);
    }
}
