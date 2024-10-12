package com.proyect.real_cartelera.back_end.model;

import jakarta.persistence.*;

@Entity
public class Pelicula {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_pelicula;
    private String nombre;
    private String descripcion;
    private String estado;

    @ManyToOne
    @JoinColumn(name = "id_categoria", referencedColumnName = "id_categoria")
    private Categoria categoria;  // Cambiado a Categoria

    // Constructor vacío (requerido por JPA)
    public Pelicula() {}

    // Constructor con parámetros
    public Pelicula(String nombre, String descripcion, String estado, Categoria categoria) { // Cambiado a Categoria
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.estado = estado;
        this.categoria = categoria;
    }

    // Getters y Setters
    public Long getId_pelicula() {
        return id_pelicula;
    }

    public void setId_pelicula(Long id_pelicula) {
        this.id_pelicula = id_pelicula;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public Categoria getCategoria() { // Cambiado a Categoria
        return categoria;
    }

    public void setCategoria(Categoria categoria) { // Cambiado a Categoria
        this.categoria = categoria;
    }

    // Método toString para depuración
    @Override
    public String toString() {
        return "Pelicula{" +
                "id_pelicula=" + id_pelicula +
                ", nombre='" + nombre + '\'' +
                ", categoria='" + (categoria != null ? categoria.getNombre() : "N/A") + '\'' + // Mejor manejo de null
                ", descripcion='" + descripcion + '\'' +
                ", estado='" + estado + '\'' +
                '}';
    }
}
