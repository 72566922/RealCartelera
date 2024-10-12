package com.proyect.real_cartelera.back_end.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_usuario;

    private String nombre;
    private String gmail;
    private String password;
    private String celular;


    // Constructor vacío (requerido por JPA)
    public Usuario() {}

    // Constructor con parámetros
    public Usuario(String nombre, String gmail, String password, String celular) {
        this.nombre = nombre;
        this.gmail = gmail;
        this.password = password;
        this.celular = celular;
    }

    // Getters y Setters
    public Long getId() {
        return id_usuario;
    }

    public void setId(Long id_usuario) {
        this.id_usuario = id_usuario;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getGmail() {
        return gmail;
    }

    public void setGmail(String gmail) {
        this.gmail = gmail;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getCelular() {
        return celular;
    }

    public void setCelular(String celular) {
        this.celular = celular;
    }


    // Método toString para depuración
    @Override
    public String toString() {
        return "Usuario{" +
                "id=" + id_usuario +
                ", nombre='" + nombre + '\'' +
                ", gmail='" + gmail + '\'' +
                ", celular='" + celular + '\'' +
                '}';
    }
}
