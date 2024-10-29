package com.proyect.real_cartelera.back_end.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.proyect.real_cartelera.back_end.model.Distrito;
import com.proyect.real_cartelera.back_end.repository.DistritoRepository;

@Service
public class DistritoService {

    @Autowired

    private DistritoRepository distritoRepository;

    public List<Distrito> getAllDistritos(){
        return distritoRepository.findAll();
    }

    // Obtener todos los distritos habilitados
    public List<Distrito> getAllDistritosHabilitados() {
        return distritoRepository.findAllByEstado("habilitado");
    }
    
    public Distrito getDistritoById(Long id) {
        return distritoRepository.findById(id).orElse(null);
    }

    public Distrito createDistrito(Distrito distrito) {
        return distritoRepository.save(distrito);
    }

    public Distrito updateDistrito(Long id, Distrito distritoDetails) {
        Distrito distrito = distritoRepository.findById(id).orElse(null);
        if (distrito != null) {
            distrito.setNombre(distritoDetails.getNombre());
            distrito.setEstado(distritoDetails.getEstado());
            return distritoRepository.save(distrito);
        }
        return null;
    }
    

    // Método para actualizar el estado de un distrito
    public Distrito updateDistritoEstado(Long id, String nuevoEstado) {
        Distrito distrito = distritoRepository.findById(id).orElse(null);
        if (distrito != null) {
            distrito.setEstado(nuevoEstado);
            return distritoRepository.save(distrito);
        }
        return null;
    }

    public void deleteDistrito(Long id) {
        distritoRepository.deleteById(id);
    }
    
}
