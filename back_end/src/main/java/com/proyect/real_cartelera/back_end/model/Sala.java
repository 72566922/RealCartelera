package com.proyect.real_cartelera.back_end.model;

import jakarta.persistence.*;

@Entity
public class Sala {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_sala;
    private String nombre;
    private String piso;
    private int num_asientos;
    private String estado; // Corrección de "esado" a "estado"

    @ManyToOne
    @JoinColumn(name = "id_sede", referencedColumnName = "id_sede")
    private Sede sede;

    // Constructor vacío (requerido por JPA)
    public Sala() {}

    // Constructor con parámetros
    public Sala(Sede sede, String nombre, String piso, int num_asientos, String estado) {
        this.sede = sede;
        this.nombre = nombre;
        this.piso = piso;
        this.num_asientos = num_asientos;
        this.estado = estado;
    }

    // Getters y Setters
    public Long getId_sala() {
        return id_sala;
    }

    public void setId_sala(Long id_sala) {
        this.id_sala = id_sala;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getPiso() {
        return piso;
    }

    public void setPiso(String piso) {
        this.piso = piso;
    }

    public int getNum_asientos() {
        return num_asientos;
    }

    public void setNum_asientos(int num_asientos) {
        this.num_asientos = num_asientos;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public Sede getSede() {
        return sede;
    }

    public void setSede(Sede sede) {
        this.sede = sede;
    }

    @Override
    public String toString() {
        return "Sala{" +
                "id_sala=" + id_sala +
                ", nombre='" + nombre + '\'' +
                ", piso='" + piso + '\'' +
                ", num_asientos=" + num_asientos +
                ", estado='" + estado + '\'' +
                ", sede=" + (sede != null ? sede.getDireccion() : "Sin sede") +
                '}';
    }
}
