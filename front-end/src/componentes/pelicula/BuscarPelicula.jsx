import React, { useState } from "react";

function BuscarPelicula({ onSearch }) {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSearch = () => {
    onSearch(inputValue);
  };

  return (
    <div className="mb-3">
      <div className="input-group">
        <input 
          type="text" 
          className="form-control" 
          value={inputValue} 
          onChange={handleInputChange} 
          placeholder="Nombre de la película"
        />
        <button className="btn btn-primary" onClick={handleSearch}>
          Buscar
        </button>
      </div>
    </div>
  );
}

export default BuscarPelicula;
