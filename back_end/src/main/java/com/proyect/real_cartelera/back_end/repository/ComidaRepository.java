package com.proyect.real_cartelera.back_end.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.proyect.real_cartelera.back_end.model.Comida;

@Repository
public interface ComidaRepository extends JpaRepository<Comida, Long> {
    // Puedes agregar consultas personalizadas aquí si es necesario
}
