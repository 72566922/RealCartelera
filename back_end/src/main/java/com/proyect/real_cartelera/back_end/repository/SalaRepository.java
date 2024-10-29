package com.proyect.real_cartelera.back_end.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.proyect.real_cartelera.back_end.model.Sala;

public interface SalaRepository extends JpaRepository<Sala, Long> {
    // Puedes añadir métodos de consulta personalizados aquí si los necesitas
}
