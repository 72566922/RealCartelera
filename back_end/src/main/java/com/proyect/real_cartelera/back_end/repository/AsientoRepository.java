package com.proyect.real_cartelera.back_end.repository;

import com.proyect.real_cartelera.back_end.model.Asiento;
import com.proyect.real_cartelera.back_end.model.Sala;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AsientoRepository extends JpaRepository<Asiento, Long> {
    List<Asiento> findBySala(Sala sala);
}
