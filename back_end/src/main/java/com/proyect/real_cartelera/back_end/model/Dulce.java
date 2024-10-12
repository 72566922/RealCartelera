package com.proyect.real_cartelera.back_end.model;

import jakarta.persistence.*;

@Entity
public class Dulce {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_dulce;
    
    private String nombre;
    private String categoria;
    private String estado;

    // Constructor vacío (requerido por JPA)
    public Dulce() {}

    // Constructor con parámetros
    public Dulce(String nombre, String categoria, String estado) {
        this.nombre = nombre;
        this.categoria = categoria;
        this.estado = estado;
    }

    // Getters y Setters
    public Long getId_dulce() {
        return id_dulce;
    }

    public void setId_dulce(Long id_dulce) {
        this.id_dulce = id_dulce;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    @Override
    public String toString() {
        return "Dulce{" +
                "id_dulce=" + id_dulce +
                ", nombre='" + nombre + '\'' +
                ", categoria='" + categoria + '\'' +
                ", estado='" + estado + '\'' +
                '}';
    }
}
