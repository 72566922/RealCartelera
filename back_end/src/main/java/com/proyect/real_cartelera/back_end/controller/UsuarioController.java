package com.proyect.real_cartelera.back_end.controller;

import com.proyect.real_cartelera.back_end.model.Usuario;
import com.proyect.real_cartelera.back_end.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

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
    public Optional<Usuario> getUsuarioById(@PathVariable Long id) {
        return usuarioService.getUsuarioById(id);
    }

    // Crear un nuevo usuario
    @PostMapping
    public Usuario createUsuario(@RequestParam String nombre,
                                  @RequestParam String gmail,
                                  @RequestParam String password,
                                  @RequestParam String celular) {
        return usuarioService.createUsuario(nombre, gmail, password, celular);
    }

    // Actualizar un usuario existente
    @PutMapping("/{id}")
    public Usuario updateUsuario(@PathVariable Long id,
                                  @RequestParam String nombre,
                                  @RequestParam String gmail,
                                  @RequestParam String password,
                                  @RequestParam String celular) {
        return usuarioService.updateUsuario(id, nombre, gmail, password, celular);
    }

    // Eliminar un usuario
    @DeleteMapping("/{id}")
    public void deleteUsuario(@PathVariable Long id) {
        usuarioService.deleteUsuario(id);
    }
}
