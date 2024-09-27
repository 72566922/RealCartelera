package com.proyect.real_cartelera.back_end.model;

import jakarta.persistence.*;

@Entity
public class Comida {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_comida;

    private double gramos;
    private double precio;
    private int unidades;

    // Relación con la entidad Dulce (llave foránea id_dulce)
    @ManyToOne
    @JoinColumn(name = "id_dulce", referencedColumnName = "id_dulce")
    private Dulce dulce;

    // Constructor vacío (requerido por JPA)
    public Comida() {}

    // Constructor con parámetros
    public Comida(Dulce dulce, double gramos, double precio, int unidades) {
        this.dulce = dulce;
        this.gramos = gramos;
        this.precio = precio;
        this.unidades = unidades;
    }

    // Getters y Setters
    public Long getId_comida() {
        return id_comida;
    }

    public void setId_comida(Long id_comida) {
        this.id_comida = id_comida;
    }

    public Dulce getDulce() {
        return dulce;
    }

    public void setDulce(Dulce dulce) {
        this.dulce = dulce;
    }

    public double getGramos() {
        return gramos;
    }

    public void setGramos(double gramos) {
        this.gramos = gramos;
    }

    public double getPrecio() {
        return precio;
    }

    public void setPrecio(double precio) {
        this.precio = precio;
    }

    public int getUnidades() {
        return unidades;
    }

    public void setUnidades(int unidades) {
        this.unidades = unidades;
    }

    @Override
    public String toString() {
        return "Comida{" +
                "id_comida=" + id_comida +
                ", gramos=" + gramos +
                ", precio=" + precio +
                ", unidades=" + unidades +
                ", dulce=" + dulce.getNombre() +
                '}';
    }
}
