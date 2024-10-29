import React, { useEffect, useState } from "react";
import CategoriaService from "../../services/CategoriaService";

function SelectCategoria({ onSelect, onCategoryChange }) {
  const [categorias, setCategorias] = useState([]);
  const [selectedCategoria, setSelectedCategoria] = useState("");

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await CategoriaService.getCategorias();
        setCategorias(response);
      } catch (error) {
        console.error("Error fetching categorias:", error);
      }
    };

    fetchCategorias();
  }, []);

  const handleSelect = (event) => {
    const selectedCategoria = event.target.value;
    setSelectedCategoria(selectedCategoria);
    onSelect(selectedCategoria); // Pasa la categoría seleccionada al componente padre
    onCategoryChange(""); // Limpia el input de búsqueda al seleccionar una categoría
  };

  return (
    <div className="mb-3">
      <select className="form-select" value={selectedCategoria} onChange={handleSelect}>
        <option value="">Selecciona una categoría</option>
        <option value="all">Seleccionar todas</option> {/* Opción para seleccionar todas */}
        {categorias.map((categoria) => (
          <option key={categoria.id_categoria} value={categoria.id_categoria}>
            {categoria.nombre}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectCategoria;
