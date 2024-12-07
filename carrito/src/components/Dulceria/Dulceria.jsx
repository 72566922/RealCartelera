import React from 'react';
import useBebidas from '../hooks/useBebidas';  // Hook personalizado para obtener las bebidas
import useComidas from '../hooks/useComidas';  // Hook personalizado para obtener las comidas
import Carrusel from './Carrusel';  // Componente Carrusel para mostrar los productos en formato de carrusel
import './dulceria.css';  // Importa el archivo CSS para la vista de dulcería

const Dulceria = () => {
    // Se obtienen las bebidas y comidas del estado, además del estado de carga
    const { bebidas, loading: loadingBebidas } = useBebidas();
    const { comidas, loading: loadingComidas } = useComidas();

    // Si las bebidas o las comidas están cargando, se muestra un mensaje de carga
    if (loadingBebidas || loadingComidas) return <p>Cargando...</p>;

    // Si no hay bebidas o no hay comidas disponibles, se muestra un mensaje adecuado
    if (!bebidas.length) return <p>No hay bebidas disponibles.</p>;
    if (!comidas.length) return <p>No hay comidas disponibles.</p>;

    // Mapeamos las bebidas a un formato que el Carrusel pueda entender
    const bebidasItems = bebidas.map(bebida => ({
        id: bebida.dulce.id_dulce,  // ID único de la bebida
        id_bebida: bebida.id_bebida,  // ID de la bebida
        nombre: bebida.dulce.nombre,  // Nombre de la bebida
        cantidad: bebida.unidades,  // Unidades disponibles
        precio: bebida.precio,  // Precio de la bebida
        litros: bebida.litros,  // Litros de la bebida
        imagenUrl: bebida.imagenUrl,  // URL de la imagen de la bebida
        agregarAlCarrito: bebida.agregarAlCarrito  // Función para agregar al carrito
    }));

    // Mapeamos las comidas a un formato que el Carrusel pueda entender
    const comidasItems = comidas.map(comida => ({
        id: comida.dulce.id_dulce,  // ID único de la comida
        id_comida: comida.id_comida,  // ID de la comida
        nombre: comida.dulce.nombre,  // Nombre de la comida
        cantidad: comida.unidades,  // Unidades disponibles
        precio: comida.precio,  // Precio de la comida
        gramos: comida.gramos,  // Gramos de la comida
        imagenUrl: comida.imagenUrl,  // URL de la imagen de la comida
        agregarAlCarrito: comida.agregarAlCarrito  // Función para agregar al carrito
    }));

    return (
        <div className="container">
            <h2 className="text-center">Dulcería</h2>  {/* Título principal de la página */}

            <div className="row d-flex justify-content-center"> {/* Usar 'justify-content-center' para centrar las columnas */}
                <div className="col-md-5 col-sm-12 mb-4"> {/* Contenedor para Bebidas */}
                    <h3>Bebidas ({bebidas.length})</h3>  {/* Título para la sección de bebidas */}
                    <div className="carrusel-container">  {/* Contenedor para el carrusel de bebidas */}
                        {/* Usamos el componente Carrusel para mostrar las bebidas */}
                        <Carrusel items={bebidasItems} title="Bebidas" />
                    </div>
                </div>

                <div className="col-md-5 col-sm-12 mb-4"> {/* Contenedor para Comidas */}
                    <h3>Comidas ({comidas.length})</h3>  {/* Título para la sección de comidas */}
                    <div className="carrusel-container">  {/* Contenedor para el carrusel de comidas */}
                        {/* Usamos el componente Carrusel para mostrar las comidas */}
                        <Carrusel items={comidasItems} title="Comidas" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dulceria;
