import React from 'react';
import useBebidas from '../hooks/useBebidas';
import useComidas from '../hooks/useComidas';
import Carrusel from './Carrusel'; // Importa el componente Carrusel
import './dulceria.css'; // Importa el archivo CSS

const Dulceria = () => {
    const { bebidas, loading: loadingBebidas } = useBebidas();
    const { comidas, loading: loadingComidas } = useComidas();

    // Manejo de estado de carga y disponibilidad
    if (loadingBebidas || loadingComidas) return <p>Cargando...</p>;
    if (!bebidas.length) return <p>No hay bebidas disponibles.</p>;
    if (!comidas.length) return <p>No hay comidas disponibles.</p>;

    // Mapeamos las bebidas a un formato que el Carrusel pueda entender
    const bebidasItems = bebidas.map(bebida => ({
        id: bebida.dulce.id_dulce,
        id_bebida: bebida.id_bebida,
        nombre: bebida.dulce.nombre,
        cantidad: bebida.unidades,
        precio: bebida.precio,
        litros: bebida.litros,
        imagenUrl: bebida.imagenUrl,
        agregarAlCarrito: bebida.agregarAlCarrito 
    }));

    // Mapeamos las comidas a un formato que el Carrusel pueda entender
    const comidasItems = comidas.map(comida => ({
        id: comida.dulce.id_dulce,
        id_comida: comida.id_comida,
        nombre: comida.dulce.nombre,
        cantidad: comida.unidades, 
        precio: comida.precio,
        gramos: comida.gramos,
        imagenUrl: comida.imagenUrl,
        agregarAlCarrito: comida.agregarAlCarrito 
    }));

    return (
        <div className="container">
            <h2 className="text-center">Dulcería</h2>

            <div className="row d-flex justify-content-center"> {/* Usar 'justify-content-center' para centrar columnas */}
                <div className="col-md-5 col-sm-12 mb-4"> {/* Contenedor para Bebidas */}
                    <h3>Bebidas ({bebidas.length})</h3>
                    <div className="carrusel-container">
                        {/* Usamos el Carrusel para las bebidas */}
                        <Carrusel items={bebidasItems} title="Bebidas" />
                    </div>
                </div>

                <div className="col-md-5 col-sm-12 mb-4"> {/* Contenedor para Comidas */}
                    <h3>Comidas ({comidas.length})</h3>
                    <div className="carrusel-container">
                        {/* Usamos el Carrusel para las comidas */}
                        <Carrusel items={comidasItems} title="Comidas" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dulceria;
