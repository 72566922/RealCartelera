package com.proyect.real_cartelera.back_end.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.proyect.real_cartelera.back_end.model.Usuario;
import com.proyect.real_cartelera.back_end.repository.UsuarioRepository;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public List<Usuario> getAllUsuarios() {
        return usuarioRepository.findAll();
    }

    public Usuario getUsuarioById(Long id) {
        return usuarioRepository.findById(id).orElse(null);
    }

    public Usuario createUsuario(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    public Usuario updateUsuario(Long id, Usuario usuarioDetails) {
        Usuario usuario = usuarioRepository.findById(id).orElse(null);
        if (usuario != null) {
            usuario.setNombre(usuarioDetails.getNombre());
            usuario.setCorreo(usuarioDetails.getCorreo());
            usuario.setContraseña(usuarioDetails.getContraseña());
            return usuarioRepository.save(usuario);
        }
        return null;
    }

    public void deleteUsuario(Long id) {
        usuarioRepository.deleteById(id);
    }
}
