package com.proyect.real_cartelera.back_end.controller;

import com.proyect.real_cartelera.back_end.model.Funcion;
import com.proyect.real_cartelera.back_end.service.FuncionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/funciones")
public class FuncionController {

    @Autowired
    private FuncionService funcionService;

    // Obtener todas las funciones
    @GetMapping
    public List<Funcion> getAllFunciones() {
        return funcionService.getAllFunciones();
    }

    // Obtener una función por ID
    @GetMapping("/{id}")
    public Optional<Funcion> getFuncionById(@PathVariable Long id) {
        return funcionService.getFuncionById(id);
    }

    // Crear una nueva función
    @PostMapping
    public Funcion createFuncion(@RequestBody Funcion funcion) {
        return funcionService.createFuncion(funcion);
    }

    // Actualizar una función existente
    @PutMapping("/{id}")
    public Funcion updateFuncion(@PathVariable Long id, @RequestBody Funcion funcionDetails) {
        return funcionService.updateFuncion(id, funcionDetails);
    }

    // Eliminar una función
    @DeleteMapping("/{id}")
    public void deleteFuncion(@PathVariable Long id) {
        funcionService.deleteFuncion(id);
    }
}
