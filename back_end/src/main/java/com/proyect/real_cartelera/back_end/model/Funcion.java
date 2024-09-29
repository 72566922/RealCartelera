package com.proyect.real_cartelera.back_end.model;

import jakarta.persistence.*;
import java.time.LocalTime;

@Entity
public class Funcion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_funcion;

    private LocalTime hora;

    private double precio; // Nuevo atributo

    @ManyToOne
    @JoinColumn(name = "id_pelicula", referencedColumnName = "id_pelicula")
    private Pelicula pelicula;



    // Constructor vacío (requerido por JPA)
    public Funcion() {}

    // Constructor con parámetros
    public Funcion(LocalTime hora, double precio, Pelicula pelicula) {
        this.hora = hora;
        this.precio = precio; // Inicializa el precio
        this.pelicula = pelicula;
    }

    // Getters y Setters
    public Long getId_funcion() {
        return id_funcion;
    }

    public void setId_funcion(Long id_funcion) {
        this.id_funcion = id_funcion;
    }

    public LocalTime getHora() {
        return hora;
    }

    public void setHora(LocalTime hora) {
        this.hora = hora;
    }

    public double getPrecio() {
        return precio; // Getter para el precio
    }

    public void setPrecio(double precio) {
        this.precio = precio; // Setter para el precio
    }

    public Pelicula getPelicula() {
        return pelicula;
    }

    public void setPelicula(Pelicula pelicula) {
        this.pelicula = pelicula;
    }



    // Método toString para depuración
    @Override
    public String toString() {
        return "Funcion{" +
                "id_funcion=" + id_funcion +
                ", hora=" + hora +
                ", precio=" + precio + // Incluye el precio en la representación
                ", pelicula=" + pelicula.getNombre() +
                '}';
    }
}
