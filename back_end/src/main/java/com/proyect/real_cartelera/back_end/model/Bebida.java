package com.proyect.real_cartelera.back_end.model;

import jakarta.persistence.*;

@Entity
public class Bebida {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_bebida;

    private double litros;
    private double precio;
    private int unidades;

    // Relación con la entidad Dulce (llave foránea id_dulce)
    @ManyToOne
    @JoinColumn(name = "id_dulce", referencedColumnName = "id_dulce")
    private Dulce dulce;

    // Constructor vacío (requerido por JPA)
    public Bebida() {}

    // Constructor con parámetros
    public Bebida(Dulce dulce, double litros, double precio, int unidades) {
        this.dulce = dulce;
        this.litros = litros;
        this.precio = precio;
        this.unidades = unidades;
    }

    // Getters y Setters
    public Long getId_bebida() {
        return id_bebida;
    }

    public void setId_bebida(Long id_bebida) {
        this.id_bebida = id_bebida;
    }

    public Dulce getDulce() {
        return dulce;
    }

    public void setDulce(Dulce dulce) {
        this.dulce = dulce;
    }

    public double getLitros() {
        return litros;
    }

    public void setLitros(double litros) {
        this.litros = litros;
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
}
