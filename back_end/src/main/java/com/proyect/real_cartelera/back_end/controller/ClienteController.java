package com.proyect.real_cartelera.back_end.controller;

import com.proyect.real_cartelera.back_end.model.Cliente;
import com.proyect.real_cartelera.back_end.service.ClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/clientes")
public class ClienteController {

    @Autowired
    private ClienteService clienteService;

    // Obtener todos los clientes
    @GetMapping
    public List<Cliente> getAllClientes() {
        return clienteService.getAllClientes();
    }

    // Obtener un cliente por ID
    @GetMapping("/{id}")
    public Optional<Cliente> getClienteById(@PathVariable Long id) {
        return clienteService.getClienteById(id);
    }

    // Crear un nuevo cliente
    @PostMapping("/register")
    public Cliente createCliente(@RequestBody Cliente cliente) {
        return clienteService.createCliente(
                cliente.getDireccion(), 
                cliente.getFecha_nacimiento(), 
                cliente.getUsuario().getId()
        );
    }

    // Actualizar un cliente existente
    @PutMapping("/{id}")
    public Cliente updateCliente(@PathVariable Long id,
                                 @RequestParam String direccion,
                                 @RequestParam String fechaNacimiento,
                                 @RequestParam(required = false) Long idUsuario) {
        return clienteService.updateCliente(id, direccion, fechaNacimiento, idUsuario);
    }

    // Eliminar un cliente
    @DeleteMapping("/{id}")
    public void deleteCliente(@PathVariable Long id) {
        clienteService.deleteCliente(id);
    }
}
