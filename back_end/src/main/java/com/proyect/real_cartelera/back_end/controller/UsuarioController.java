package com.proyect.real_cartelera.back_end.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.proyect.real_cartelera.back_end.model.Usuario;
import com.proyect.real_cartelera.back_end.service.UsuarioService;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    // Obtener todos los usuarios
    @GetMapping
    public List<Usuario> getAllUsuarios() {
        return usuarioService.getAllUsuarios();
    }

    // Obtener un usuario por ID
    @GetMapping("/{id}")
    public Usuario getUsuarioById(@PathVariable Long id) {
        return usuarioService.getUsuarioById(id);
    }

    // Crear un nuevo usuario
    @PostMapping
    public Usuario createUsuario(@RequestBody Usuario usuario) {
        return usuarioService.createUsuario(usuario);
    }

    // Actualizar un usuario existente
    @PutMapping("/{id}")
    public Usuario updateUsuario(@PathVariable Long id, @RequestBody Usuario usuarioDetails) {
        return usuarioService.updateUsuario(id, usuarioDetails);
    }

    // Eliminar un usuario
    @DeleteMapping("/{id}")
    public void deleteUsuario(@PathVariable Long id) {
        usuarioService.deleteUsuario(id);
    }
}


