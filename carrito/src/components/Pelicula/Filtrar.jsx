import React, { useState, useEffect } from "react";
import CategoriaService from "../../service/CategoriaService"; // Importa el servicio que maneja las categorías

// Componente Filtrar para seleccionar una categoría
function Filtrar({ setCategoriaSeleccionada }) {
  // Estado local para almacenar las categorías disponibles
  const [categorias, setCategorias] = useState([]);

  // useEffect se ejecuta al montar el componente para cargar las categorías
  useEffect(() => {
    // Función asíncrona para obtener las categorías desde el servicio
    const fetchCategorias = async () => {
      try {
        const categoriasData = await CategoriaService.getCategorias(); // Llama al servicio
        setCategorias(categoriasData); // Actualiza el estado con las categorías recibidas
      } catch (error) {
        console.error("Error al cargar las categorías:", error); // Manejo de errores
      }
    };

    fetchCategorias(); // Llama a la función de carga al montar el componente
  }, []); // [] asegura que este efecto solo se ejecute una vez al montar el componente

  // Maneja el cambio de la categoría seleccionada en el dropdown
  const manejarCambioCategoria = (event) => {
    const categoriaId = parseInt(event.target.value, 10); // Convierte el valor a un número entero
    setCategoriaSeleccionada(categoriaId); // Actualiza la categoría seleccionada en el componente padre
    console.log("Categoría seleccionada:", categoriaId); // Muestra la categoría seleccionada en la consola
  };

  return (
    <div className="mb-4">
      {/* Título del filtro */}
      <h3>FILTRAR</h3>

      {/* Etiqueta para la lista desplegable */}
      <label htmlFor="categoria">Selecciona una categoría:</label>

      {/* Dropdown para seleccionar la categoría */}
      <select
        id="categoria"
        onChange={manejarCambioCategoria} // Maneja los cambios en la selección
        className="form-select" // Estilo de Bootstrap para un select
      >
        <option value="">Todas las categorías</option> {/* Opción por defecto */}
        {/* Mapea las categorías y crea un <option> para cada una */}
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
