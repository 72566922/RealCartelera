package com.proyect.real_cartelera.back_end.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity // Define esta clase como una entidad JPA que se mapeará a una tabla en la base de datos.
public class Asiento {

    @Id // Indica que este atributo es la clave primaria.
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Genera automáticamente el valor de ID.
    private Long id_asiento; // Identificador único del asiento.

    private String nombre; // Nombre del asiento, como "A1", "B2".
    private String estado; // Estado del asiento: "Disponible", "Reservado" u "Ocupado".

    @ManyToOne // Relación muchos-a-uno con la entidad Sala.
    @JoinColumn(name = "id_sala", referencedColumnName = "id_sala") // Especifica la columna que establece la relación.
    private Sala sala; // Sala a la que pertenece el asiento.

    // Constructor vacío requerido por JPA.
    public Asiento() {}

    // Constructor con parámetros para inicializar objetos de Asiento.
    public Asiento(String nombre, String estado, Sala sala) {
        this.nombre = nombre;
        this.estado = estado;
        this.sala = sala;
    }

    // Métodos getters y setters para acceder y modificar los atributos.
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

    // Método toString para representar el objeto como una cadena (útil para depuración).
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
