package com.proyect.real_cartelera.back_end.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.proyect.real_cartelera.back_end.model.Pelicula;
import com.proyect.real_cartelera.back_end.model.Categoria; // Asegúrate de importar Categoria

import java.util.List;

@Repository
public interface PeliculaRepository extends JpaRepository<Pelicula, Long> {
    // Método para obtener las películas habilitadas
    List<Pelicula> findByEstado(String estado);
    List<Pelicula> findByCategoria(Categoria categoria); // Cambiado a Categoria
}
