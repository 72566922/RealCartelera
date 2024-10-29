// Dulceria.js
import React, { useState } from 'react';
import useBebidas from '../hooks/useBebidas';
import useComidas from '../hooks/useComidas';
import ModalCarrito from '../ModalCarrito'; // Asegúrate de importar correctamente el modal
import Producto from './Producto'; // Importar el componente Producto

const Dulceria = () => {
    const { bebidas, loading: loadingBebidas } = useBebidas();
    const { comidas, loading: loadingComidas } = useComidas();

    // Estado para controlar el modal
    const [isModalOpen, setIsModalOpen] = useState(false);

    if (loadingBebidas || loadingComidas) return <p>Cargando...</p>;

    return (
        <div>
            <h2>Dulcería</h2>

            <h3>Bebidas ({bebidas.length})</h3>
            <ul>
                {bebidas.map(bebida => (
                    <li key={bebida.id_bebida}>
                        {/* Pasamos el objeto 'bebida' al componente Producto */}
                        <Producto item={{ 
                            idDulce: bebida.dulce.id_dulce, 
                            nombre: bebida.dulce.nombre, 
                            precio: bebida.precio,
                            litros: bebida.litros,
                            id: bebida.id_bebida
                        }} />
                    </li>
                ))}
            </ul>

            <h3>Comidas ({comidas.length})</h3>
            <ul>
                {comidas.map(comida => (
                    <li key={comida.id_comida}>
                        {/* Pasamos el objeto 'comida' al componente Producto */}
                        <Producto item={{ 
                            id: comida.id_comida, 
                            nombre: comida.dulce.nombre, 
                            precio: comida.precio,
                            gramos: comida.gramos 
                        }} />
                    </li>
                ))}
            </ul>

            {/* Modal para mostrar el carrito */}
            <button onClick={() => setIsModalOpen(true)}>Ver Carrito</button>
            <ModalCarrito isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
};

export default Dulceria;
