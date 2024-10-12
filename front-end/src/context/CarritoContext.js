import React, { createContext, useContext, useState } from 'react';

const CarritoContext = createContext();

export const useCarrito = () => {
    return useContext(CarritoContext);
};

export const CarritoProvider = ({ children }) => {
    const [itemsCarrito, setItemsCarrito] = useState([]);

    const addToCart = (item) => {
        setItemsCarrito(prevItems => [...prevItems, item]);
    };

    return (
        <CarritoContext.Provider value={{ itemsCarrito, addToCart }}>
            {children}
        </CarritoContext.Provider>
    );
};
