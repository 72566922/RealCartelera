package com.proyect.real_cartelera.back_end.controller;

import com.proyect.real_cartelera.back_end.model.Funcion;
import com.proyect.real_cartelera.back_end.model.Pelicula;
import com.proyect.real_cartelera.back_end.model.Sala;
import com.proyect.real_cartelera.back_end.service.FuncionService;
import com.proyect.real_cartelera.back_end.service.PeliculaService;
import com.proyect.real_cartelera.back_end.service.SalaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/funciones")
public class FuncionController {

    @Autowired
    private FuncionService funcionService;

    @Autowired
    private SalaService salaService;

    @Autowired
    private PeliculaService peliculaService;

    @GetMapping("/pelicula")
    public List<Funcion> getFuncionesPorPelicula(@RequestParam Long idPelicula) {
        Pelicula pelicula = peliculaService.getPeliculaById(idPelicula)
                .orElseThrow(() -> new RuntimeException("Película no encontrada"));
        return funcionService.getFuncionesPorPelicula(pelicula);
    }

    // Obtener todas las películas de las funciones
    @GetMapping("/peliculas")
    public ResponseEntity<List<Pelicula>> getAllPeliculasFromFunciones() {
        List<Funcion> funciones = funcionService.getAllFunciones();

        // Extraer las películas de cada función y eliminar duplicados
        List<Pelicula> peliculas = funciones.stream()
                .map(Funcion::getPelicula) // Obtiene la película de cada función
                .distinct() // Elimina duplicados
                .toList();

        return ResponseEntity.ok(peliculas);
    }

    // Obtener todas las funciones
    @GetMapping
    public List<Funcion> getAllFunciones() {
        return funcionService.getAllFunciones();
    }

    // Obtener funciones por sala
    @GetMapping("/sala")
    public List<Funcion> getFuncionesPorSala(@RequestParam Long idSala) {
        Sala sala = salaService.getSalaById(idSala)
                .orElseThrow(() -> new RuntimeException("Sala no encontrada"));
        return funcionService.getFuncionesPorSala(sala); // Se corrigió el parámetro pasado
    }

    // Obtener una función por ID
    @GetMapping("/{id}")
    public ResponseEntity<Funcion> getFuncionById(@PathVariable Long id) {
        return funcionService.getFuncionById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Crear una nueva función
    @PostMapping
    public ResponseEntity<Funcion> createFuncion(@Validated @RequestBody Funcion funcion) {
        Funcion createdFuncion = funcionService.createFuncion(funcion);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdFuncion);
    }

    // Actualizar una función existente
    @PutMapping("/{id}")
    public ResponseEntity<Funcion> updateFuncion(@PathVariable Long id,
            @Validated @RequestBody Funcion funcionDetails) {
        Funcion updatedFuncion = funcionService.updateFuncion(id, funcionDetails);
        return ResponseEntity.ok(updatedFuncion);
    }

    // Eliminar una función
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFuncion(@PathVariable Long id) {
        funcionService.deleteFuncion(id);
        return ResponseEntity.noContent().build();
    }

    // Obtener ID de sala por ID de función
    @GetMapping("/sala/{id}")
    public ResponseEntity<Long> getIdSalaByFuncionId(@PathVariable Long id) {
        return funcionService.getFuncionById(id)
                .map(funcion -> {
                    Long idSala = funcion.getSala() != null ? funcion.getSala().getId_sala() : null;
                    return ResponseEntity.ok(idSala);
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
