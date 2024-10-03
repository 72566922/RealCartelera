import React, { useState } from "react";
import GaleriaPelicula from "./GaleriaPelicula";
import SelectCategoria from "./SelectCategoria";
import BuscarPelicula from "./BuscarPelicula";

function PeliculaComponent() {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  const [busqueda, setBusqueda] = useState("");

  const handleCategoriaSelect = (categoria) => {
    setCategoriaSeleccionada(categoria);
  };

  const handleSearch = (pelicula) => {
    setBusqueda(pelicula);
    // Limpia la categoría seleccionada al buscar
    setCategoriaSeleccionada("");
  };

  return (
    <div className="container">
      <h3 className="text-center">Aquí irán las películas</h3>
      <div className="mb-4">
        <SelectCategoria 
          onSelect={handleCategoriaSelect} 
          onCategoryChange={setBusqueda} // Pasar la función para limpiar el input
        />
        <BuscarPelicula onSearch={handleSearch} />
      </div>
      <GaleriaPelicula 
        categoria={categoriaSeleccionada === "all" ? "" : categoriaSeleccionada} 
        busqueda={busqueda} 
      />
    </div>
  );
}

export default PeliculaComponent;
