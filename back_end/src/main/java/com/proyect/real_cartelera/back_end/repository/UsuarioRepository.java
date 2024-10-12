package com.proyect.real_cartelera.back_end.repository;

import com.proyect.real_cartelera.back_end.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    // Puedes agregar métodos personalizados si es necesario
}
