package com.proyect.real_cartelera.back_end.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.proyect.real_cartelera.back_end.model.Dulce;
import com.proyect.real_cartelera.back_end.repository.DulceRepository;

@Service
public class DulceService {
    
    @Autowired
    private DulceRepository dulceRepository;

    public List<Dulce> getAllDulces() {
        return dulceRepository.findAll();
    }

    // Obtener todos los dulces habilitados
    public List<Dulce> getAllDulcesHabilitados() {
        return dulceRepository.findAllByEstado("habilitado");
    }
    
    public Dulce getDulceById(Long id) {
        return dulceRepository.findById(id).orElse(null);
    }

    public Dulce createDulce(Dulce dulce) {
        return dulceRepository.save(dulce);
    }

    public Dulce updateDulce(Long id, Dulce dulceDetails) {
        Dulce dulce = dulceRepository.findById(id).orElse(null);
        if (dulce != null) {
            dulce.setNombre(dulceDetails.getNombre());
            dulce.setCategoria(dulceDetails.getCategoria());
            dulce.setEstado(dulceDetails.getEstado());
            return dulceRepository.save(dulce);
        }
        return null;
    }
    

    // Método para actualizar el estado de un dulce
    public Dulce updateDulceEstado(Long id, String nuevoEstado) {
        Dulce dulce = dulceRepository.findById(id).orElse(null);
        if (dulce != null) {
            dulce.setEstado(nuevoEstado);
            return dulceRepository.save(dulce);
        }
        return null;
    }

    public void deleteDulce(Long id) {
        dulceRepository.deleteById(id);
    }
}
