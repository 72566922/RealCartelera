package com.proyect.real_cartelera.back_end.dto;

public class BoletoDTO {
    private Long idBoleto;
    private String nombreAsiento;
    private String horaFuncion;
    private String direccionCliente;
    private String nombreUsuario;
    private String nombreSala;
    private String pisoSala;
    private String direccionSede;
    private String nombreDistrito;

    // Constructor
    public BoletoDTO(Long idBoleto, String nombreAsiento, String horaFuncion,
            String nombreSala, String pisoSala, String direccionSede,
            String nombreDistrito) {
        this.idBoleto = idBoleto;
        this.nombreAsiento = nombreAsiento;
        this.horaFuncion = horaFuncion;
        this.nombreSala = nombreSala;
        this.pisoSala = pisoSala;
        this.direccionSede = direccionSede;
        this.nombreDistrito = nombreDistrito;
    }

    // Getters y Setters
    public Long getIdBoleto() {
        return idBoleto;
    }

    public void setIdBoleto(Long idBoleto) {
        this.idBoleto = idBoleto;
    }

    public String getNombreAsiento() {
        return nombreAsiento;
    }

    public void setNombreAsiento(String nombreAsiento) {
        this.nombreAsiento = nombreAsiento;
    }

    public String getHoraFuncion() {
        return horaFuncion;
    }

    public void setHoraFuncion(String horaFuncion) {
        this.horaFuncion = horaFuncion;
    }

    public String getDireccionCliente() {
        return direccionCliente;
    }

    public void setDireccionCliente(String direccionCliente) {
        this.direccionCliente = direccionCliente;
    }

    public String getNombreUsuario() {
        return nombreUsuario;
    }

    public void setNombreUsuario(String nombreUsuario) {
        this.nombreUsuario = nombreUsuario;
    }

    public String getNombreSala() {
        return nombreSala;
    }

    public void setNombreSala(String nombreSala) {
        this.nombreSala = nombreSala;
    }

    public String getPisoSala() {
        return pisoSala;
    }

    public void setPisoSala(String pisoSala) {
        this.pisoSala = pisoSala;
    }

    public String getDireccionSede() {
        return direccionSede;
    }

    public void setDireccionSede(String direccionSede) {
        this.direccionSede = direccionSede;
    }

    public String getNombreDistrito() {
        return nombreDistrito;
    }

    public void setNombreDistrito(String nombreDistrito) {
        this.nombreDistrito = nombreDistrito;
    }
}
