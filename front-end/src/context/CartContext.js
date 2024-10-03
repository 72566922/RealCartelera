// src/CartContext.js
import React, { createContext, useContext, useState } from 'react';

// Crear el contexto del carrito
const CartContext = createContext();

// Hook personalizado para usar el contexto del carrito
export const useCart = () => {
    return useContext(CartContext);
};

// Proveedor del contexto del carrito
export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    // Función para agregar un producto al carrito
    const addToCart = (product) => {
        setCart((prevCart) => [...prevCart, product]);
    };

    // Función para eliminar un producto del carrito
    const removeFromCart = (productId) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};

