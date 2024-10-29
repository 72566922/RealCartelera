package com.proyect.real_cartelera.back_end.model;

import jakarta.persistence.*;

@Entity
public class Boleto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_boleto;

    @ManyToOne
    @JoinColumn(name = "id_funcion", referencedColumnName = "id_funcion")
    private Funcion funcion;

    @ManyToOne
    @JoinColumn(name = "id_asiento", referencedColumnName = "id_asiento")
    private Asiento asiento;

    @ManyToOne
    @JoinColumn(name = "id_usuario", referencedColumnName = "id_usuario")
    private Usuario usuario;

    // Constructor por defecto
    public Boleto() {
    }

    // Constructor con parámetros
    public Boleto(Funcion funcion, Asiento asiento, Usuario usuario) {
        this.funcion = funcion;
        this.asiento = asiento;
        this.usuario = usuario;
    }

    // Getters y Setters
    public Long getIdBoleto() {
        return id_boleto;
    }

    public void setIdBoleto(Long idBoleto) {
        this.id_boleto = idBoleto;
    }

    public Funcion getFuncion() {
        return funcion;
    }

    public void setFuncion(Funcion funcion) {
        this.funcion = funcion;
    }

    public Asiento getAsiento() {
        return asiento;
    }

    public void setAsiento(Asiento asiento) {
        this.asiento = asiento;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }
}
