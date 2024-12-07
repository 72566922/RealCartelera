package com.proyect.real_cartelera.back_end.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.proyect.real_cartelera.back_end.model.Bebida;
import com.proyect.real_cartelera.back_end.repository.BebidaRepository;

import java.util.List;

@Service
public class BebidaService {

    @Autowired
    private BebidaRepository bebidaRepository;

    public List<Bebida> getAllBebidas() {
        return bebidaRepository.findAll();
    }

    public List<Bebida> getBebidasConUnidadesDisponibles() {
        return bebidaRepository.findBebidasConUnidadesDisponibles();
    }

    public Bebida getBebidaById(Long id) {
        return bebidaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Bebida no encontrada"));
    }

    public Bebida createBebida(Bebida bebida) {
        return bebidaRepository.save(bebida);
    }

    public Bebida updateBebida(Long id, Bebida bebidaDetails) {
        Bebida bebida = getBebidaById(id);
        bebida.setDulce(bebidaDetails.getDulce());
        bebida.setLitros(bebidaDetails.getLitros());
        bebida.setPrecio(bebidaDetails.getPrecio());
        bebida.setUnidades(bebidaDetails.getUnidades());
        return bebidaRepository.save(bebida);
    }

    public Bebida venderBebida(Long id, int cantidadVendida) {
        if (cantidadVendida <= 0) {
            throw new IllegalArgumentException("La cantidad vendida debe ser mayor que cero.");
        }

        Bebida bebida = bebidaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Bebida no encontrada"));

        if (bebida.getUnidades() < cantidadVendida) {
            throw new RuntimeException("No hay suficientes unidades disponibles");
        }

        bebida.setUnidades(bebida.getUnidades() - cantidadVendida);
        return bebidaRepository.save(bebida);
    }

    public void deleteBebida(Long id) {
        bebidaRepository.deleteById(id);
    }
}
