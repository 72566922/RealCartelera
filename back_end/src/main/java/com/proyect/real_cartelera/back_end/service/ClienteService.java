package com.proyect.real_cartelera.back_end.service;

import com.proyect.real_cartelera.back_end.model.Cliente;
import com.proyect.real_cartelera.back_end.model.Usuario;
import com.proyect.real_cartelera.back_end.repository.ClienteRepository;
import com.proyect.real_cartelera.back_end.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClienteService {

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    // Obtener todos los clientes
    public List<Cliente> getAllClientes() {
        return clienteRepository.findAll();
    }

    // Obtener un cliente por ID
    public Optional<Cliente> getClienteById(Long id) {
        return clienteRepository.findById(id);
    }

    // Crear un nuevo cliente
    public Cliente createCliente(String direccion, String fechaNacimiento, Long idUsuario) {
        // Buscar el usuario por ID
        Usuario usuario = usuarioRepository.findById(idUsuario)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        // Crear el cliente
        Cliente cliente = new Cliente(direccion, fechaNacimiento, usuario);
        return clienteRepository.save(cliente);
    }

    // Actualizar un cliente existente
    public Cliente updateCliente(Long id, String direccion, String fechaNacimiento, Long idUsuario) {
        Cliente cliente = clienteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cliente no encontrado"));

        // Actualizar los campos de cliente
        cliente.setDireccion(direccion);
        cliente.setFecha_nacimiento(fechaNacimiento);

        // Actualizar usuario si se proporciona un nuevo ID de usuario
        if (idUsuario != null) {
            Usuario usuario = usuarioRepository.findById(idUsuario)
                    .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
            cliente.setUsuario(usuario);
        }

        return clienteRepository.save(cliente);
    }

    // Eliminar un cliente
    public void deleteCliente(Long id) {
        clienteRepository.deleteById(id);
    }
}
