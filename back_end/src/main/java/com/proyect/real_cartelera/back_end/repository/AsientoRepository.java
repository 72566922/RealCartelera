package com.proyect.real_cartelera.back_end.repository;

import com.proyect.real_cartelera.back_end.model.Asiento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AsientoRepository extends JpaRepository<Asiento, Long> {
    // Aquí puedes definir métodos adicionales si los necesitas.
}
