import React from "react";
import PeliculaFuncionComponent from "./PeliculaFuncionComponent";
import BebidaComidaComponent from "./BebidaComidaComponent";
import BotonBoleteria from "./BotonBoleteria";
import BotonDulceria from "./BotonDulceria";

function InicioComponent() {
    return (
        <div className="container">
            <div className="inicio-container">
                <h3 className="inicio-header text-center">Inicio</h3>
                <div className="row">
                    <div className="col-md-6">
                        <div className="pelicula-section" style={{ marginBottom: '5px' }}>
                            <BotonBoleteria />
                            <PeliculaFuncionComponent />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="bebida-comida-section" style={{ marginBottom: '5px' }}>
                            <BotonDulceria />
                            <BebidaComidaComponent />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InicioComponent;
