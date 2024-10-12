package com.proyect.real_cartelera.back_end.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.proyect.real_cartelera.back_end.model.Distrito;
import com.proyect.real_cartelera.back_end.service.DistritoService;

@RestController
@RequestMapping("/api/distritos")
public class DistritoController {

    @Autowired
    private DistritoService distritoService;

    @GetMapping
    public List<Distrito> getAllDistritos(){
        return distritoService.getAllDistritos();
    }

    // Obtener todos los distrito habilitados
    @GetMapping("/habilitados")
    public List<Distrito> getAllDistritosHabilitados() {
        return distritoService.getAllDistritosHabilitados();
    }

    // Obtener un distrito por ID
    @GetMapping("/{id}")
    public Distrito getDistritoById(@PathVariable Long id) {
        return distritoService.getDistritoById(id);
    }

    // Crear un nuevo distrito
    @PostMapping
    public Distrito createDistrito(@RequestBody Distrito dulce) {
        return distritoService.createDistrito(dulce);
    }

    // Actualizar el estado de un distrito
    @PutMapping("/{id}/estado")
    public Distrito updateDistritoEstado(@PathVariable Long id, @RequestBody String nuevoEstado) {
        return distritoService.updateDistritoEstado(id, nuevoEstado);
    }

    // Actualizar un distrito existente
    @PutMapping("/{id}")
    public Distrito updateDistrito(@PathVariable Long id, @RequestBody Distrito dulceDetails) {
        return distritoService.updateDistrito(id, dulceDetails);
    }

    // Eliminar un distrito
    @DeleteMapping("/{id}")
    public void deleteDulce(@PathVariable Long id) {
        distritoService.deleteDistrito(id);
    }
}
