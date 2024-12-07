import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';  // Importa el archivo CSS de Bootstrap para estilos predefinidos
import Producto from './Producto';  // Componente Producto para renderizar los detalles de cada producto en el carrusel

const Carrusel = ({ items, title }) => {  // Componente Carrusel que recibe una lista de productos 'items' y un título 'title'
    return (
        <div id={`${title}-carousel`} className="carousel slide" data-bs-ride="false"> {/* Definimos el carrusel con un ID único basado en el título */}
            <div className="carousel-inner">  {/* Contenedor de los elementos del carrusel */}
                {items.map((item, index) => (  // Iteramos sobre los elementos (productos) para mostrarlos en el carrusel
                    <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={item.id}>  {/* Marcamos el primer item como 'activo' */}
                        <div className="row justify-content-center">  {/* Aseguramos que el item esté centrado en el carrusel */}
                            <div className="col-12">  {/* Usamos 'col-12' para que el item ocupe todo el ancho disponible */}
                                <Producto  // Componente Producto que se encargará de mostrar los detalles del producto */
                                    item={item}  // Pasamos el producto al componente Producto
                                    agregarAlCarrito={item.agregarAlCarrito}  // Pasamos la función 'agregarAlCarrito' al componente Producto
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {/* Botón de control para navegar hacia el item anterior */}
            <button className="carousel-control-prev" type="button" data-bs-target={`#${title}-carousel`} data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>  {/* Icono para el control previo */}
                <span className="visually-hidden">Previous</span>  {/* Texto oculto para accesibilidad */}
            </button>
            {/* Botón de control para navegar hacia el siguiente item */}
            <button className="carousel-control-next" type="button" data-bs-target={`#${title}-carousel`} data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>  {/* Icono para el control siguiente */}
                <span className="visually-hidden">Next</span>  {/* Texto oculto para accesibilidad */}
            </button>
        </div>
    );
};

export default Carrusel;  // Exporta el componente Carrusel
