package com.proyect.real_cartelera.back_end.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.proyect.real_cartelera.back_end.model.Pelicula;
import com.proyect.real_cartelera.back_end.model.Categoria; 
import com.proyect.real_cartelera.back_end.service.PeliculaService;
import com.proyect.real_cartelera.back_end.service.CategoriaService; 

import java.util.List;

@RestController
@RequestMapping("/api/peliculas")
public class PeliculaController {

    @Autowired
    private PeliculaService peliculaService;

    @Autowired
    private CategoriaService categoriaService; 

    // Obtener todas las películas o películas por categoría
    @GetMapping
    public List<Pelicula> getPeliculas(@RequestParam(required = false) Long categoriaId) {
        if (categoriaId != null) {
            Categoria categoria = categoriaService.getCategoriaById(categoriaId);
            return peliculaService.getPeliculasPorCategoria(categoria);
        }
        return peliculaService.getAllPeliculas();
    }

    // Obtener todas las películas habilitadas
    @GetMapping("/habilitadas")
    public List<Pelicula> getAllPeliculasHabilitadas() {
        return peliculaService.getAllPeliculasHabilitadas();
    }

    // Obtener una película por ID
    @GetMapping("/{id}")
    public ResponseEntity<Pelicula> getPeliculaById(@PathVariable Long id) {
        return peliculaService.getPeliculaById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Crear una nueva película
    @PostMapping
    public Pelicula createPelicula(@RequestBody Pelicula pelicula) {
        return peliculaService.createPelicula(pelicula);
    }

    // Actualizar el estado de una película
    @PutMapping("/{id}/estado")
    public Pelicula updatePeliculaEstado(@PathVariable Long id, @RequestBody String nuevoEstado) {
        return peliculaService.updatePeliculaEstado(id, nuevoEstado);
    }

    // Actualizar una película existente
    @PutMapping("/{id}")
    public Pelicula updatePelicula(@PathVariable Long id, @RequestBody Pelicula peliculaDetails) {
        return peliculaService.updatePelicula(id, peliculaDetails);
    }

    // Eliminar una película
    @DeleteMapping("/{id}")
    public void deletePelicula(@PathVariable Long id) {
        peliculaService.deletePelicula(id);
    }
}
