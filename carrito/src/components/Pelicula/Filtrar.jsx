import React, { useState, useEffect } from "react";
import CategoriaService from "../../service/CategoriaService";

function Filtrar({ setCategoriaSeleccionada }) {
  // Estado para guardar las categorías
  const [categorias, setCategorias] = useState([]);

  // Cargar las categorías al montar el componente
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const categoriasData = await CategoriaService.getCategorias();
        setCategorias(categoriasData);
      } catch (error) {
        console.error("Error al cargar las categorías:", error);
      }
    };

    fetchCategorias();
  }, []);

  // Manejador para cuando el usuario selecciona una categoría
  const manejarCambioCategoria = (event) => {
    const categoriaId = parseInt(event.target.value, 10); // Convertir a número
    setCategoriaSeleccionada(categoriaId);
    console.log("Categoría seleccionada:", categoriaId);
  };

  return (
    <div>
      <h3>FILTRAR</h3>
      <label htmlFor="categoria">Selecciona una categoría:</label>
      <select id="categoria" onChange={manejarCambioCategoria}>
        <option value="">AllCategoria</option>
        {categorias.map((categoria) => (
          <option key={categoria.id_categoria} value={categoria.id_categoria}>
            {categoria.nombre} {/* Muestra el nombre de la categoría */}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Filtrar;
