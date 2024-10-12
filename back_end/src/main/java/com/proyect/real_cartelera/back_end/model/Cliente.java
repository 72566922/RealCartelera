package com.proyect.real_cartelera.back_end.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;

import java.time.LocalDate;

@Entity
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_cliente;
    private String direccion;
    private String fecha_nacimiento;
    private LocalDate fecha_registro;  // Nueva fecha de registro

    @ManyToOne
    @JoinColumn(name = "id_usuario", referencedColumnName = "id_usuario")
    private Usuario usuario;

    // Constructor vacío (requerido por JPA)
    public Cliente() {}

    // Constructor con parámetros
    public Cliente(String direccion, String fecha_nacimiento, Usuario usuario) {
        this.direccion = direccion;
        this.fecha_nacimiento = fecha_nacimiento;
        this.usuario = usuario;
    }

    // Método que se ejecuta antes de persistir el objeto para asignar la fecha de registro actual
    @PrePersist
    public void prePersist() {
        this.fecha_registro = LocalDate.now();  // Asignar la fecha actual
    }

    // Getters y Setters
    public Long getId_cliente() {
        return id_cliente;
    }

    public void setId_cliente(Long id_cliente) {
        this.id_cliente = id_cliente;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public String getFecha_nacimiento() {
        return fecha_nacimiento;
    }

    public void setFecha_nacimiento(String fecha_nacimiento) {
        this.fecha_nacimiento = fecha_nacimiento;
    }

    public LocalDate getFecha_registro() {
        return fecha_registro;
    }

    public void setFecha_registro(LocalDate fecha_registro) {
        this.fecha_registro = fecha_registro;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    // Método toString para depuración
    @Override
    public String toString() {
        return "Cliente{" +
                "id_cliente=" + id_cliente +
                ", direccion='" + direccion + '\'' +
                ", fecha_nacimiento='" + fecha_nacimiento + '\'' +
                ", fecha_registro=" + fecha_registro +
                ", usuario=" + (usuario != null ? usuario.getId() : "null") +
                '}';
    }
}
