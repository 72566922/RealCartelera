package com.proyect.real_cartelera.back_end.service;

// import com.proyect.real_cartelera.back_end.dto.BoletoDTO;
import com.proyect.real_cartelera.back_end.model.Boleto;
import com.proyect.real_cartelera.back_end.model.Funcion;
import com.proyect.real_cartelera.back_end.model.Usuario;
import com.proyect.real_cartelera.back_end.model.Asiento;
import com.proyect.real_cartelera.back_end.repository.BoletoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BoletoService {

    @Autowired
    private BoletoRepository boletoRepository;

    @Autowired
    private JdbcTemplate jdbcTemplate; // Para ejecutar la consulta SQL

    // Obtener todos los boletos
    public List<Boleto> getAllBoletos() {
        return boletoRepository.findAll();
    }

    public List<Asiento> getAllBoletosPorIdFuncion(Long idFuncion) {
        String sql = "SELECT a.* " +
                     "FROM boleto b " +
                     "JOIN asiento a ON b.id_asiento = a.id_asiento " +
                     "WHERE b.id_funcion = ?";
    
        return jdbcTemplate.query(sql, (ps) -> {
            ps.setLong(1, idFuncion);
        }, (rs, rowNum) -> {
            Asiento asiento = new Asiento();
            asiento.setId_asiento(rs.getLong("id_asiento")); // Usamos setId si es el nombre correcto
            asiento.setNombre(rs.getString("nombre"));
            asiento.setEstado(rs.getString("estado"));
            return asiento;
        });
    }
    

    // Obtener un boleto por ID
    public Optional<Boleto> getBoletoById(Long id) {
        return boletoRepository.findById(id);
    }

    // Crear un nuevo boleto
    public Boleto createBoleto(Funcion funcion, Asiento asiento, Usuario usuario) {
        Boleto boleto = new Boleto(funcion, asiento, usuario);
        return boletoRepository.save(boleto);
    }

    // Actualizar un boleto existente
    public Boleto updateBoleto(Long id, Funcion funcion, Asiento asiento) {
        Boleto boleto = boletoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Boleto no encontrado"));

        boleto.setFuncion(funcion);
        boleto.setAsiento(asiento);

        return boletoRepository.save(boleto);
    }

    // Eliminar un boleto
    public void deleteBoleto(Long id) {
        boletoRepository.deleteById(id);
    }

    // Método para obtener los detalles de los boletos
    /* public List<BoletoDTO> getBoletoDetails() {
        String sql = "SELECT b.id_boleto, a.nombre AS nombre_asiento, f.hora AS hora_funcion, "
                + " u.nombre AS nombre_usuario, "
                + "s.nombre AS nombre_sala, s.piso AS piso_sala, "
                + "sd.direccion AS direccion_sede, d.nombre AS nombre_distrito "
                + "FROM boleto b "
                + "JOIN asiento a ON b.id_asiento = a.id_asiento "
                + "JOIN funcion f ON b.id_funcion = f.id_funcion "
                + "JOIN sala s ON a.id_sala = s.id_sala "
                + "JOIN sede sd ON s.id_sede = sd.id_sede "
                + "JOIN distrito d ON sd.id_distrito = d.id_distrito";

        return jdbcTemplate.query(sql, (rs, rowNum) -> new BoletoDTO(
                rs.getLong("id_boleto"),
                rs.getString("nombre_asiento"),
                rs.getString("hora_funcion"),
                rs.getString("nombre_sala"),
                rs.getString("piso_sala"),
                rs.getString("direccion_sede"),
                rs.getString("nombre_distrito")));
    } */
}
