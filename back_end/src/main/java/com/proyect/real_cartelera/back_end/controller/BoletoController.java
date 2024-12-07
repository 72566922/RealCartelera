package com.proyect.real_cartelera.back_end.controller;

// import com.proyect.real_cartelera.back_end.dto.BoletoDTO;
import com.proyect.real_cartelera.back_end.model.Asiento;
import com.proyect.real_cartelera.back_end.model.Boleto;
import com.proyect.real_cartelera.back_end.model.Funcion;
import com.proyect.real_cartelera.back_end.model.Usuario;
import com.proyect.real_cartelera.back_end.service.AsientoService;
import com.proyect.real_cartelera.back_end.service.BoletoService;
import com.proyect.real_cartelera.back_end.service.FuncionService;
import com.proyect.real_cartelera.back_end.service.UsuarioService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/boletos")
public class BoletoController {

    @Autowired
    private BoletoService boletoService;

    @Autowired
    private UsuarioService usuarioService;
    @Autowired
    private FuncionService funcionService;
    @Autowired
    private AsientoService asientoService;

    // Obtener todos los boletos
    @GetMapping
    public List<Boleto> getAllBoletos() {
        return boletoService.getAllBoletos();
    }

    // Obtener un boleto por ID
    @GetMapping("/{id}")
    public ResponseEntity<Boleto> getBoletoById(@PathVariable Long id) {
        Optional<Boleto> boleto = boletoService.getBoletoById(id);
        return boleto.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/asientos/funcion/{idFuncion}")
    public List<Asiento> getAsientosPorFuncion(@PathVariable Long idFuncion) {
        return boletoService.getAllBoletosPorIdFuncion(idFuncion);
    }

    @PostMapping("/post")
    public ResponseEntity<Boleto> createBoleto(@RequestBody Boleto boleto) {
        Optional<Funcion> optionalFuncion = funcionService.getFuncionById(boleto.getFuncion().getId_funcion());
        Optional<Asiento> optionalAsiento = asientoService.getAsientoById(boleto.getAsiento().getId_asiento());
        Optional<Usuario> optionalUsuario = usuarioService.getUsuarioById(boleto.getUsuario().getId());

        if (!optionalFuncion.isPresent() || !optionalAsiento.isPresent() || !optionalUsuario.isPresent()) {
            return ResponseEntity.badRequest().body(null); // Datos incompletos o inválidos
        }

        Boleto newBoleto = boletoService.createBoleto(optionalFuncion.get(), optionalAsiento.get(),
                optionalUsuario.get());
        return new ResponseEntity<>(newBoleto, HttpStatus.CREATED);
    }

    // Actualizar un boleto existente
    @PutMapping("/{id}")
    public ResponseEntity<Boleto> updateBoleto(@PathVariable Long id, @RequestBody Boleto boleto) {
        Boleto updatedBoleto = boletoService.updateBoleto(id, boleto.getFuncion(), boleto.getAsiento());
        return ResponseEntity.ok(updatedBoleto);
    }

    // Eliminar un boleto
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBoleto(@PathVariable Long id) {
        boletoService.deleteBoleto(id);
        return ResponseEntity.noContent().build();
    }

    /*
     * / Obtener detalles de boletos
    @GetMapping("/detalles")
    public ResponseEntity<List<BoletoDTO>> getBoletoDetails() {
        List<BoletoDTO> boletoDetails = boletoService.getBoletoDetails();
        return new ResponseEntity<>(boletoDetails, HttpStatus.OK);
    }
     */
}
