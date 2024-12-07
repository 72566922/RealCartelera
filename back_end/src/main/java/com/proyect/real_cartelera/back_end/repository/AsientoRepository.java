package com.proyect.real_cartelera.back_end.repository;

import com.proyect.real_cartelera.back_end.model.Asiento;
import com.proyect.real_cartelera.back_end.model.Sala;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

// Interfaz que extiende JpaRepository para manejar operaciones CRUD sobre la entidad Asiento.
public interface AsientoRepository extends JpaRepository<Asiento, Long> {
    // Método personalizado para encontrar asientos por sala.
    List<Asiento> findBySala(Sala sala);
}
