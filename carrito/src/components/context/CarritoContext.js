import React, { createContext, useContext, useState } from 'react';

// Creamos el contexto para el carrito de compras
const CarritoContext = createContext();

// Proveedor del contexto que permite a los componentes acceder a los datos del carrito
export const CarritoProvider = ({ children }) => {
    const [carritoDulceria, setCarritoDulceria] = useState([]);
    const [carritoFunciones, setCarritoFunciones] = useState([]);
    const [carritoBoletos, setCarritoBoletos] = useState([]);

    // Función para agregar productos al carrito de dulcería
    const agregarAlCarritoDulceria = (item) => {
        setCarritoDulceria((prevCarrito) => {
            const existe = prevCarrito.find((producto) => producto.id === item.id);
            if (existe) {
                return prevCarrito.map((producto) =>
                    producto.id === item.id
                        ? {
                            ...producto,
                            cantidad: producto.cantidad + item.cantidad,
                            precioTotal: (producto.cantidad + item.cantidad) * producto.precio
                        }
                        : producto
                );
            } else {
                return [...prevCarrito, { ...item, cantidad: item.cantidad, precioTotal: item.cantidad * item.precio }];
            }
        });
    };

    const agregarAlCarritoFunciones = (item, id_asiento) => {
        console.log('Intentando agregar a funciones:', item);

        const existeBoleto = carritoBoletos.some(boleto =>
            boleto.id_funcion === item.id && boleto.id_asiento === id_asiento
        );

        if (existeBoleto) {
            console.log(`Error: el boleto para el asiento ID ${id_asiento} ya está reservado para esta función.`);
            alert(`No se puede agregar la función, el asiento ID ${id_asiento} ya está reservado para esta función.`);
            return;
        }

        setCarritoFunciones((prevCarrito) => {
            const existe = prevCarrito.find((funcion) => funcion.id === item.id);

            if (existe) {
                console.log('Error: la función ya está en el carrito.');
                return prevCarrito;
            } else {
                const nuevoItem = { ...item, cantidad: 1, precioTotal: item.precio };
                console.log('Función agregada al carrito:', nuevoItem);
                return [...prevCarrito, nuevoItem];
            }
        });
    };

    // Función para agregar boletos al carrito
    // Función para agregar boletos al carrito
    const agregarAlCarritoBoletos = (nuevoBoleto, cantidad = 1) => {
        console.log('Intentando agregar boleto:', nuevoBoleto);

        const existeBoleto = carritoBoletos.some(boleto =>
            boleto.id_asiento === nuevoBoleto.id_asiento &&
            boleto.id_funcion === nuevoBoleto.id_funcion &&
            boleto.estado === nuevoBoleto.estado
        );

        if (existeBoleto) {
            console.log(`El boleto ID: ${nuevoBoleto.id_asiento} para la función ID: ${nuevoBoleto.id_funcion} ya existe en el carrito.`);
            alert(`El boleto ID: ${nuevoBoleto.id_asiento} para la función ID: ${nuevoBoleto.id_funcion} ya está en el carrito.`);
            return;
        }

        // Obtener el precio de la función relacionada
        const funcion = carritoFunciones.find(func => func.id === nuevoBoleto.id_funcion);
        const precio = funcion ? funcion.precio : nuevoBoleto.precio || 0; // Asegúrate de que el precio provenga de la función

        // Crear el objeto del boleto con su precio, cantidad y calcular el precio total
        const boletoConPrecio = {
            ...nuevoBoleto,
            precio, // Aquí asignamos el precio de la función
            cantidad,
            precioTotal: precio * cantidad // Calcula el precio total del boleto
        };

        console.log('Boleto agregado al carrito:', boletoConPrecio);
        setCarritoBoletos(prevBoletos => [...prevBoletos, boletoConPrecio]);
    };


    // Función para limpiar todos los carritos
    const limpiarCarrito = () => {
        setCarritoDulceria([]);
        setCarritoFunciones([]);
        setCarritoBoletos([]);
        console.log('Todos los carritos han sido vaciados');
    };

    // Funciones para eliminar productos del carrito
    const eliminarDelCarritoDulceria = (id) => {
        console.log('Eliminando del carrito de dulcería, ID:', id);
        setCarritoDulceria((prevCarrito) => {
            const nuevoCarrito = prevCarrito.filter(producto => producto.id !== id);
            console.log('Carrito de dulcería actualizado:', nuevoCarrito);
            return nuevoCarrito;
        });
    };

    const eliminarDelCarritoFunciones = (id) => {
        console.log('Eliminando función del carrito, ID:', id);
        setCarritoFunciones((prevCarrito) => {
            const nuevoCarrito = prevCarrito.filter(funcion => funcion.id !== id);
            console.log('Carrito de funciones actualizado:', nuevoCarrito);

            // Eliminar todos los boletos relacionados a la función eliminada
            eliminarDelCarritoBoletosPorFuncion(id); // Llamar a la nueva función para eliminar boletos

            return nuevoCarrito;
        });
    };

    // Nueva función para eliminar boletos asociados a una función
    const eliminarDelCarritoBoletosPorFuncion = (id_funcion) => {
        setCarritoBoletos(prevBoletos => {
            const nuevosBoletos = prevBoletos.filter(boleto => boleto.id_funcion !== id_funcion);
            console.log(`Boletos eliminados para la función ID: ${id_funcion}`, nuevosBoletos);
            return nuevosBoletos;
        });
    };

    const eliminarDelCarritoBoletos = (id_asiento, id_funcion) => {
        setCarritoBoletos(prevBoletos => {
            const nuevosBoletos = prevBoletos.filter(boleto => !(boleto.id_asiento === id_asiento && boleto.id_funcion === id_funcion));

            const hayBoletosRestantes = nuevosBoletos.some(boleto => boleto.id_funcion === id_funcion);
            if (!hayBoletosRestantes) {
                eliminarDelCarritoFunciones(id_funcion);
            }

            return nuevosBoletos;
        });
    };

    // Proporcionamos el estado y las funciones a los componentes que lo necesiten
    return (
        <CarritoContext.Provider value={{
            carritoDulceria,
            carritoFunciones,
            carritoBoletos,
            limpiarCarrito,
            agregarAlCarritoDulceria,
            agregarAlCarritoFunciones,
            agregarAlCarritoBoletos,
            eliminarDelCarritoDulceria,
            eliminarDelCarritoFunciones,
            eliminarDelCarritoBoletos,
        }}>
            {children}
        </CarritoContext.Provider>
    );
};

// Hook personalizado para usar el contexto
export const useCarrito = () => {
    return useContext(CarritoContext);
};
