import React, { useState, useEffect } from "react";
import AsientoService from "../../services/AsientoService";

function AsientoSelect() {
  const [asientos, setAsientos] = useState([]); // Estado para almacenar los asientos

  const fetchAsientos = () => {
    console.log("Llamando a AsientoService para obtener los asientos...");
    AsientoService.getAllAsientos()
      .then(response => {
        console.log("Asientos obtenidos:", response.data);
        setAsientos(response.data); // Actualiza el estado con los asientos obtenidos
      })
      .catch(error => console.error('Error al obtener los asientos', error)); // Manejo de errores
  };

  // Llamar a fetchAsientos al montar el componente
  useEffect(() => {
    fetchAsientos();
  }, []);

  return (
    <div>
      <h3>Seleccione un asiento:</h3>
      <ul>
        {asientos.map(asiento => (
          <li key={asiento.id_asiento}>
            {asiento.nombre} - {asiento.estado} - {asiento.sala.nombre}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AsientoSelect;
