package com.proyect.real_cartelera.back_end.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.proyect.real_cartelera.back_end.model.Usuario;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    // Puedes agregar métodos personalizados si es necesario, por ejemplo, encontrar por correo
    Usuario findByCorreo(String correo);
}