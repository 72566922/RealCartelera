package com.proyect.real_cartelera.back_end.repository;

import com.proyect.real_cartelera.back_end.model.Funcion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FuncionRepository extends JpaRepository<Funcion, Long> {
    // Puedes agregar consultas personalizadas aquí si las necesitas
}
