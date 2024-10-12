package com.proyect.real_cartelera.back_end.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.proyect.real_cartelera.back_end.model.Pelicula;
import com.proyect.real_cartelera.back_end.model.Categoria; // Asegúrate de importar Categoria
import com.proyect.real_cartelera.back_end.repository.PeliculaRepository;

import java.util.List;
import java.util.Optional;

@Service
public class PeliculaService {

    @Autowired
    private PeliculaRepository peliculaRepository;

    // Obtener todas las películas
    public List<Pelicula> getAllPeliculas() {
        return peliculaRepository.findAll();
    }

    // Obtener todas las películas habilitadas
    public List<Pelicula> getAllPeliculasHabilitadas() {
        return peliculaRepository.findByEstado("habilitado");
    }

    // Obtener una película por ID
    public Optional<Pelicula> getPeliculaById(Long id) {
        return peliculaRepository.findById(id); // Retorna Optional<Pelicula>
    }

    // Crear una nueva película
    public Pelicula createPelicula(Pelicula pelicula) {
        return peliculaRepository.save(pelicula);
    }

    public List<Pelicula> getPeliculasPorCategoria(Categoria categoria) { // Cambiado a Categoria
        return peliculaRepository.findByCategoria(categoria); // Suponiendo que tienes este método en tu repositorio
    }

    // Actualizar el estado de una película
    public Pelicula updatePeliculaEstado(Long id, String nuevoEstado) {
        Pelicula pelicula = getPeliculaById(id).orElse(null);
        if (pelicula != null) {
            pelicula.setEstado(nuevoEstado);
            return peliculaRepository.save(pelicula);
        }
        return null;
    }

    // Actualizar una película existente
    public Pelicula updatePelicula(Long id, Pelicula peliculaDetails) {
        Pelicula pelicula = getPeliculaById(id).orElse(null);
        if (pelicula != null) {
            pelicula.setNombre(peliculaDetails.getNombre());
            pelicula.setDescripcion(peliculaDetails.getDescripcion());
            pelicula.setEstado(peliculaDetails.getEstado());
            return peliculaRepository.save(pelicula);
        }
        return null;
    }

    // Eliminar una película
    public void deletePelicula(Long id) {
        peliculaRepository.deleteById(id);
    }
}
