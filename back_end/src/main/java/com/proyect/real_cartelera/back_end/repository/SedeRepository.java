package com.proyect.real_cartelera.back_end.repository;

import com.proyect.real_cartelera.back_end.model.Sede;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SedeRepository extends JpaRepository<Sede, Long> {
    List<Sede> findByEstado(String estado);
}
