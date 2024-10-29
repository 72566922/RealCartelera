package com.proyect.real_cartelera.back_end.model;

import jakarta.persistence.*;

@Entity
public class Categoria {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_categoria;
    
    @Column(nullable = false, unique = true) // Asegura que el nombre sea único y no nulo
    private String nombre;
    
    private String estado;

    // Constructor vacío
    public Categoria() {}

    // Constructor con parámetros
    public Categoria(String nombre, String estado) {
        this.nombre = nombre;
        this.estado = estado;
    }

    // Getters y Setters
    public Long getId_categoria() {
        return id_categoria;
    }

    public void setId_categoria(Long id_categoria) {
        this.id_categoria = id_categoria;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    @Override
    public String toString() {
        return "Categoria{" +
                "id_categoria=" + id_categoria +
                ", nombre='" + nombre + '\'' +
                ", estado='" + estado + '\'' +
                '}';
    }
}
