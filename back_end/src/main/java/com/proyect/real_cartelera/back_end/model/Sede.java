package com.proyect.real_cartelera.back_end.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Sede {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id_sede;
    private String direccion;
    private String estado;

    @ManyToOne
    @JoinColumn(name = "id_distrito", referencedColumnName = "id_distrito")
    private Distrito distrito;

    // Constructor vacío (requerido por JPA)
    public Sede() {}

    // Constructor con parámetros
    public Sede(Distrito distrito, String direccion, String estado) {
        this.distrito = distrito;
        this.direccion = direccion;
        this.estado = estado;
    }

    // Getters y Setters
    public Long getId_sede() {
        return id_sede;
    }

    public void setId_sede(Long id_sede) {
        this.id_sede = id_sede;
    }

    public Distrito getDistrito() {
        return distrito;
    }

    public void setDistrito(Distrito distrito) {
        this.distrito = distrito;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }


    @Override
    public String toString() {
        return "Comida{" +
                "id_sede=" + id_sede +
                ", direccion=" + direccion +
                ", estado=" + estado +
                ", distrito=" + distrito.getNombre() +
                '}';
    }
}
