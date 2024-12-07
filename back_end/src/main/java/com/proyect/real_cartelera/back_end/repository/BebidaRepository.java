package com.proyect.real_cartelera.back_end.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.proyect.real_cartelera.back_end.model.Bebida;

import java.util.List;

@Repository
public interface BebidaRepository extends JpaRepository<Bebida, Long> {

    @Query("SELECT b FROM Bebida b WHERE b.unidades > 0")
    List<Bebida> findBebidasConUnidadesDisponibles();
}

