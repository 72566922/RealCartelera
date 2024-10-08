package com.proyect.real_cartelera.back_end.model;

import jakarta.persistence.*;

@Entity
public class Funcion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_funcion;

    @ManyToOne
    @JoinColumn(name = "id_sala", referencedColumnName = "id_sala")
    private Sala sala;

    @ManyToOne
    @JoinColumn(name = "id_pelicula", referencedColumnName = "id_pelicula")
    private Pelicula pelicula;

    private String hora;   // Por ejemplo
    private String fecha;  // Para fecha de la función
    private String estado; // Estado de la función, por ejemplo, 'disponible', 'agotada', etc.

    // Constructor vacío
    public Funcion() {}

    // Constructor con parámetros
    public Funcion(Sala sala, String hora, Pelicula pelicula, String fecha, String estado) {
        this.sala = sala;
        this.hora = hora;
        this.pelicula = pelicula;
        this.fecha = fecha;
        this.estado = estado;
    }

    // Getters y Setters
    public Long getId_funcion() {
        return id_funcion;
    }

    public void setId_funcion(Long id_funcion) {
        this.id_funcion = id_funcion;
    }

    public Sala getSala() {
        return sala;
    }

    public void setSala(Sala sala) {
        this.sala = sala;
    }

    public String getHora() {
        return hora;
    }

    public void setHora(String hora) {
        this.hora = hora;
    }

    public Pelicula getPelicula() {
        return pelicula;
    }

    public void setPelicula(Pelicula pelicula) {
        this.pelicula = pelicula;
    }

    public String getFecha() {
        return fecha;
    }

    public void setFecha(String fecha) {
        this.fecha = fecha;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    @Override
    public String toString() {
        return "Funcion{" +
                "id_funcion=" + id_funcion +
                ", sala=" + (sala != null ? sala.getNombre() : "Sin sala") +
                ", pelicula='" + pelicula + '\'' +
                ", hora='" + hora + '\'' +
                ", fecha='" + fecha + '\'' +
                ", estado='" + estado + '\'' +
                '}';
    }
}
