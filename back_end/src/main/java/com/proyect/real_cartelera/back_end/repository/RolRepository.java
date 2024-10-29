package com.proyect.real_cartelera.back_end.repository;

import com.proyect.real_cartelera.back_end.model.Rol;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RolRepository extends JpaRepository<Rol, Long> {
    // Aquí puedes agregar métodos personalizados si es necesario
    Rol findByNombre(String nombre);
}
