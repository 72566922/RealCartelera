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
    <div className="mt-5">
      <div className="row mb-4">
        <div className="col-md-6">
          <SelectCategoria 
            onSelect={handleCategoriaSelect} 
            onCategoryChange={setBusqueda} // Pasar la función para limpiar el input
          />
        </div>
        <div className="col-md-6">
          <BuscarPelicula onSearch={handleSearch} />
        </div>
      </div>
      <GaleriaPelicula 
        categoria={categoriaSeleccionada === "all" ? "" : categoriaSeleccionada} 
        busqueda={busqueda} 
      />
    </div>
  );
}

export default PeliculaComponent;
