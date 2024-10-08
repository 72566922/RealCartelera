package com.proyect.real_cartelera.back_end.model;

import java.util.List;

public class ReservarAsientosRequest {
    private List<Asiento> asientos;
    private int totalAsientos;

    // Constructor vacío
    public ReservarAsientosRequest() {
    }

    // Constructor con parámetros
    public ReservarAsientosRequest(List<Asiento> asientos, int totalAsientos) {
        this.asientos = asientos;
        this.totalAsientos = totalAsientos;
    }

    // Getters y Setters
    public List<Asiento> getAsientos() {
        return asientos;
    }

    public void setAsientos(List<Asiento> asientos) {
        this.asientos = asientos;
    }

    public int getTotalAsientos() {
        return totalAsientos;
    }

    public void setTotalAsientos(int totalAsientos) {
        this.totalAsientos = totalAsientos;
    }
}
