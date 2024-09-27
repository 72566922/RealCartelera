package com.proyect.real_cartelera.back_end.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.proyect.real_cartelera.back_end.model.Comida;
import com.proyect.real_cartelera.back_end.repository.ComidaRepository;

@Service
public class ComidaService {

    @Autowired
    private ComidaRepository comidaRepository;

    // Obtener todas las comidas
    public List<Comida> getAllComidas() {
        return comidaRepository.findAll();
    }

    // Obtener una comida por su ID
    public Comida getComidaById(Long id) {
        Optional<Comida> comida = comidaRepository.findById(id);
        return comida.orElse(null); // Retorna null si no se encuentra
    }

    // Crear una nueva comida
    public Comida createComida(Comida comida) {
        return comidaRepository.save(comida);
    }

    // Actualizar una comida existente
    public Comida updateComida(Long id, Comida comidaDetails) {
        Optional<Comida> existingComida = comidaRepository.findById(id);
        if (existingComida.isPresent()) {
            Comida comida = existingComida.get();
            comida.setDulce(comidaDetails.getDulce());  // Actualiza la relación con Dulce
            comida.setGramos(comidaDetails.getGramos());
            comida.setPrecio(comidaDetails.getPrecio());
            comida.setUnidades(comidaDetails.getUnidades());
            return comidaRepository.save(comida);
        } else {
            return null; // O lanzar una excepción si prefieres manejar errores
        }
    }

    // Eliminar una comida
    public void deleteComida(Long id) {
        comidaRepository.deleteById(id);
    }

    // Vender una comida
    public Comida venderComida(Long id, int cantidadVendida) {
        Optional<Comida> optionalComida = comidaRepository.findById(id);

        if (optionalComida.isPresent()) {
            Comida comida = optionalComida.get();

            // Verificar que hay suficientes unidades para vender
            if (comida.getUnidades() < cantidadVendida) {
                throw new IllegalArgumentException("No hay suficientes unidades disponibles.");
            }

            // Restar la cantidad vendida de las unidades disponibles
            comida.setUnidades(comida.getUnidades() - cantidadVendida);
            
            // Guardar la comida actualizada
            return comidaRepository.save(comida);
        } else {
            throw new IllegalArgumentException("Comida no encontrada.");
        }
    }
}
