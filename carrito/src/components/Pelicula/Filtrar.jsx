import React, { useState, useEffect } from "react";
import CategoriaService from "../../service/CategoriaService";

function Filtrar({ setCategoriaSeleccionada }) {
  const [categorias, setCategorias] = useState([]);

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

  const manejarCambioCategoria = (event) => {
    const categoriaId = parseInt(event.target.value, 10);
    setCategoriaSeleccionada(categoriaId);
    console.log("Categoría seleccionada:", categoriaId);
  };

  return (
    <div className="mb-4">
      <h3>FILTRAR</h3>
      <label htmlFor="categoria">Selecciona una categoría:</label>
      <select id="categoria" onChange={manejarCambioCategoria} className="form-select">
        <option value="">Todas las categorías</option>
        {categorias.map((categoria) => (
          <option key={categoria.id_categoria} value={categoria.id_categoria}>
            {categoria.nombre}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Filtrar;
