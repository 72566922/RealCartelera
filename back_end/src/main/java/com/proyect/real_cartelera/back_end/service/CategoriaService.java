package com.proyect.real_cartelera.back_end.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.proyect.real_cartelera.back_end.model.Categoria;
import com.proyect.real_cartelera.back_end.repository.CategoriaRepository;

import java.util.List;
import java.util.Optional;

@Service
public class CategoriaService {

    @Autowired
    private CategoriaRepository categoriaRepository;

    // Obtener todas las categorías
    public List<Categoria> getAllCategorias() {
        return categoriaRepository.findAll();
    }

    // Obtener una categoría por ID
    public Categoria getCategoriaById(Long id) {
        Optional<Categoria> categoria = categoriaRepository.findById(id);
        return categoria.orElse(null);
    }

    // Crear una nueva categoría
    public Categoria createCategoria(Categoria categoria) {
        return categoriaRepository.save(categoria);
    }

    // Actualizar una categoría existente
    public Categoria updateCategoria(Long id, Categoria categoriaDetails) {
        Categoria categoria = getCategoriaById(id);
        if (categoria != null) {
            categoria.setNombre(categoriaDetails.getNombre());
            categoria.setEstado(categoriaDetails.getEstado());
            return categoriaRepository.save(categoria);
        }
        return null;
    }

    // Eliminar una categoría
    public void deleteCategoria(Long id) {
        categoriaRepository.deleteById(id);
    }
}
