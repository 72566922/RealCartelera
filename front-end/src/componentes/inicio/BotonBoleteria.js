import React from "react";
import { Link } from "react-router-dom"; // Importa Link desde react-router-dom

function BotonBoleteria() {
  return (
    <div className="text-center mt-3"> {/* Centra el botón y agrega margen superior */}
      <Link to="/peliculas" style={{ textDecoration: 'none' }}>
        <button className="btn btn-primary btn-lg btn-block"> {/* Usa clases de Bootstrap para estilizar el botón */}
          Ir a Boletos
        </button>
      </Link>
    </div>
  );
}

export default BotonBoleteria;
