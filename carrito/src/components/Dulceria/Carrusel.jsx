import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Producto from './Producto';

const Carrusel = ({ items, title }) => {
    return (
        <div id={`${title}-carousel`} className="carousel slide" data-bs-ride="false"> {/* Cambiar 'data-bs-ride' a 'false' */}
            <div className="carousel-inner">
                {items.map((item, index) => (
                    <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={item.id}>
                        <div className="row justify-content-center"> {/* Aseguramos que usemos una fila para el item */}
                            <div className="col-12"> {/* Usar col-12 para que ocupe todo el ancho en el carrusel */}
                                <Producto 
                                    item={item} 
                                    agregarAlCarrito={item.agregarAlCarrito} // Pasamos la función al componente Producto
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target={`#${title}-carousel`} data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target={`#${title}-carousel`} data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
};

export default Carrusel;
