package com.proyect.real_cartelera.back_end.repository;

import com.proyect.real_cartelera.back_end.model.Boleto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BoletoRepository extends JpaRepository<Boleto, Long> {
}
