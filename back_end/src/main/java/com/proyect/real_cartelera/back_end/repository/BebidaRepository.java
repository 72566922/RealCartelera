package com.proyect.real_cartelera.back_end.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.proyect.real_cartelera.back_end.model.Bebida;

@Repository
public interface BebidaRepository extends JpaRepository<Bebida, Long> {
}
