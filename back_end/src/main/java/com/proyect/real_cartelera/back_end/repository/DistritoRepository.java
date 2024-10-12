package com.proyect.real_cartelera.back_end.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.proyect.real_cartelera.back_end.model.Distrito;

@Repository
public interface DistritoRepository extends JpaRepository<Distrito,Long>{

    List<Distrito> findAllByEstado(String estado);
} 
