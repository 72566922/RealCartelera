package com.proyect.real_cartelera.back_end.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Asiento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_asiento;

    private String nombre;  // Puede ser algo como "A1", "B2", etc.
    private String estado;  // Por ejemplo: "Disponible", "Reservado", "Ocupado"

    @ManyToOne
    @JoinColumn(name = "id_sala", referencedColumnName = "id_sala")
    private Sala sala;

    // Constructor vacío (necesario para JPA)
    public Asiento() {}

    // Constructor con parámetros
    public Asiento(String nombre, String estado, Sala sala) {
        this.nombre = nombre;
        this.estado = estado;
        this.sala = sala;
    }

    // Getters y Setters
    public Long getId_asiento() {
        return id_asiento;
    }

    public void setId_asiento(Long id_asiento) {
        this.id_asiento = id_asiento;
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

    public Sala getSala() {
        return sala;
    }

    public void setSala(Sala sala) {
        this.sala = sala;
    }

    // Método toString para depuración
    @Override
    public String toString() {
        return "Asiento{" +
                "id_asiento=" + id_asiento +
                ", nombre='" + nombre + '\'' +
                ", estado='" + estado + '\'' +
                ", sala=" + sala.getNombre() +
                '}';
    }
}
