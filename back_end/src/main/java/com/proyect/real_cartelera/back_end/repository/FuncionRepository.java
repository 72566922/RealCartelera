package com.proyect.real_cartelera.back_end.repository;

import com.proyect.real_cartelera.back_end.model.Funcion;
import com.proyect.real_cartelera.back_end.model.Pelicula;
import com.proyect.real_cartelera.back_end.model.Sala;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface FuncionRepository extends JpaRepository<Funcion, Long> {
    List<Funcion> findBySala(Sala sala);
    List<Funcion> findByPelicula(Pelicula pelicula);  // Nuevo método para buscar por película
}
