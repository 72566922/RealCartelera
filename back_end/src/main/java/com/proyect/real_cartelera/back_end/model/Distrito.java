package com.proyect.real_cartelera.back_end.model;

import jakarta.persistence.*;

@Entity
public class Distrito {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_distrito;
    private String nombre;
    private String estado;

    public Distrito(){}

    public Distrito(String nombre,String estado) {
        this.nombre = nombre;
        this.estado = estado;
    }

    public Long getId_distrito() {
        return id_distrito;
    }

    public void setId_distrito(Long id_distrito) {
        this.id_distrito = id_distrito;
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
        return "Dulce{" +
                "id_distrito=" + id_distrito +
                ", nombre='" + nombre + '\'' +
                ", estado='" + estado + '\'' +
                '}';
    }

}
