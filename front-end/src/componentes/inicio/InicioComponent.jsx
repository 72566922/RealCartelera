import React from "react";
import DulceCaruselComponent from "./DulceCarruselComponent";
import CarruselEstrenos from "./CarruselEstrenos";
import BotonBoleteria from "./BotonBoleteria";

function InicioComponent() {
  return (
    <div className=" mt-5"> {/* Contenedor de Bootstrap */}
      <h3 className="text-center mb-4">Este es el inicio</h3> {/* Título centrado */}
      <div className="row"> {/* Fila para columnas */}
        <div className="col-md-6 mb-4"> {/* Columna para el carrusel de estrenos */}
          <BotonBoleteria />
          <CarruselEstrenos />
        </div>
        <div className="col-md-6 mb-4"> {/* Columna para el carrusel de dulces */}
          <DulceCaruselComponent />
        </div>
      </div>
    </div>
  );
}

export default InicioComponent;
