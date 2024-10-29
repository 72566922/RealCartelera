package com.proyect.real_cartelera.back_end.service;

import com.proyect.real_cartelera.back_end.model.Usuario;
import com.proyect.real_cartelera.back_end.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    // Obtener todos los usuarios
    public List<Usuario> getAllUsuarios() {
        return usuarioRepository.findAll();
    }

    // Obtener un usuario por ID
    public Optional<Usuario> getUsuarioById(Long id) {
        return usuarioRepository.findById(id);
    }

    // Crear un nuevo usuario
    public Usuario createUsuario(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    // Actualizar un usuario existente
    public Usuario updateUsuario(Long id, Usuario usuario) {
        Usuario existingUsuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        existingUsuario.setNombre(usuario.getNombre());
        existingUsuario.setGmail(usuario.getGmail());
        existingUsuario.setPassword(usuario.getPassword());
        existingUsuario.setCelular(usuario.getCelular());

        return usuarioRepository.save(existingUsuario);
    }

    // Eliminar un usuario
    public void deleteUsuario(Long id) {
        usuarioRepository.deleteById(id);
    }

    // Buscar un usuario por Gmail y Password
    public Optional<Usuario> getUsuarioByGmailAndPassword(String gmail, String password) {
        return usuarioRepository.findByGmailAndPassword(gmail, password);
    }
}

