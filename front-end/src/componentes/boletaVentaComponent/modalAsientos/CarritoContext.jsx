import React, { createContext, useState, useContext } from 'react';

// Crear contexto para el carrito
const CarritoContext = createContext();

// Proveedor del carrito para toda la aplicación
export const CarritoProvider = ({ children }) => {
    const [carrito, setCarrito] = useState([]);

    const agregarAlCarrito = (producto) => {
        setCarrito((prevCarrito) => [...prevCarrito, producto]);
    };

    return (
        <CarritoContext.Provider value={{ carrito, agregarAlCarrito }}>
            {children}
        </CarritoContext.Provider>
    );
};

// Hook para usar el contexto del carrito
export const useCarrito = () => {
    return useContext(CarritoContext);
};
