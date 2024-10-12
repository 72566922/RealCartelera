import React from "react";
import { Link } from "react-router-dom";

function BotonDulceria() {

  return (

    <div className="text-center mt-3"> {/* Centra el botón y agrega margen superior */}
      <Link to="/dulceria" style={{ textDecoration: 'none' }}>
        <button className="btn btn-primary btn-lg btn-block"> {/* Usa clases de Bootstrap para estilizar el botón */}
          Ir a Dulces
        </button>
      </Link>
    </div>
  );
}

export default BotonDulceria;