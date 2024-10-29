package com.proyect.real_cartelera.back_end.repository;

import com.proyect.real_cartelera.back_end.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    
    // Método personalizado para buscar por gmail y password
    Optional<Usuario> findByGmailAndPassword(String gmail, String password);
}

