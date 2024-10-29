package com.proyect.real_cartelera.back_end.service;

import com.proyect.real_cartelera.back_end.model.Rol;
import com.proyect.real_cartelera.back_end.repository.RolRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RolService {

    @Autowired
    private RolRepository rolRepository;

    // Obtener todos los roles
    public List<Rol> getAllRoles() {
        return rolRepository.findAll();
    }

    // Obtener un rol por ID
    public Optional<Rol> getRolById(Long id) {
        return rolRepository.findById(id);
    }

    // Crear un nuevo rol
    public Rol createRol(String nombre, String estado) {
        Rol rol = new Rol(nombre, estado);
        return rolRepository.save(rol);
    }

    // Actualizar un rol existente
    public Rol updateRol(Long id, String nombre, String estado) {
        Rol rol = rolRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Rol no encontrado"));

        rol.setNombre(nombre);
        rol.setEstado(estado);
        return rolRepository.save(rol);
    }

    // Eliminar un rol
    public void deleteRol(Long id) {
        rolRepository.deleteById(id);
    }
}
