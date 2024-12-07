import React, { createContext, useContext, useState, useEffect } from 'react';

// Creamos el contexto para el carrito de compras, para poder compartir los datos de los carritos entre los componentes.
const CarritoContext = createContext();

// Proveedor del contexto que permite a los componentes acceder a los datos del carrito.
export const CarritoProvider = ({ children }) => {
    // Estados para los tres carritos: dulcería, funciones y boletos.
    const [carritoDulceria, setCarritoDulceria] = useState([]);
    const [carritoFunciones, setCarritoFunciones] = useState([]);
    const [carritoBoletos, setCarritoBoletos] = useState([]);

    // Efecto para verificar si los carritos están vacíos y mostrar un mensaje en la consola si es el caso.
    useEffect(() => {
        if (carritoDulceria.length === 0) {
            console.log('El carrito de dulcería está vacío.');
        }
        if (carritoFunciones.length === 0) {
            console.log('El carrito de funciones está vacío.');
        }
        if (carritoBoletos.length === 0) {
            console.log('El carrito de boletos está vacío.');
        }
    }, [carritoDulceria, carritoFunciones, carritoBoletos]);

    // Función para agregar productos al carrito de dulcería, manejando tanto la adición de nuevos productos como la actualización de los existentes.
    const agregarAlCarritoDulceria = (item) => {
        setCarritoDulceria((prevCarrito) => {
            const existe = prevCarrito.find((producto) => producto.id === item.id);
            if (existe) {
                // Si el producto ya existe, se actualiza su cantidad y precio total.
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
                // Si no existe, se agrega como nuevo producto al carrito.
                return [...prevCarrito, { ...item, cantidad: item.cantidad, precioTotal: item.cantidad * item.precio }];
            }
        });
    };

    // Función para agregar funciones al carrito, verificando si el asiento ya está reservado.
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

        // Si la función no existe en el carrito, se agrega al carrito de funciones.
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

    // Función para agregar boletos al carrito, verificando si el boleto ya está en el carrito.
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

        const precio = nuevoBoleto.precio;

        // Se agrega el boleto al carrito, calculando su precio total.
        const boletoConPrecio = {
            ...nuevoBoleto,
            precio,
            cantidad,
            precioTotal: precio * cantidad
        };

        console.log('Boleto agregado al carrito:', boletoConPrecio);
        setCarritoBoletos(prevBoletos => [...prevBoletos, boletoConPrecio]);
    };

    // Función para limpiar todos los carritos.
    const limpiarCarrito = () => {
        setCarritoDulceria([]);
        setCarritoFunciones([]);
        setCarritoBoletos([]);
        console.log('Todos los carritos han sido vaciados');
    };

    // Función para eliminar productos del carrito de dulcería.
    const eliminarDelCarritoDulceria = (id) => {
        console.log('Eliminando del carrito de dulcería, ID:', id);
        setCarritoDulceria((prevCarrito) => {
            const nuevoCarrito = prevCarrito.filter(producto => producto.id !== id);
            console.log('Carrito de dulcería actualizado:', nuevoCarrito);
            return nuevoCarrito;
        });
    };

    // Función para eliminar funciones del carrito, y también eliminar los boletos correspondientes a esa función.
    const eliminarDelCarritoFunciones = (id) => {
        console.log('Eliminando función del carrito, ID:', id);
        setCarritoFunciones((prevCarrito) => {
            const nuevoCarrito = prevCarrito.filter(funcion => funcion.id !== id);
            console.log('Carrito de funciones actualizado:', nuevoCarrito);
            eliminarDelCarritoBoletosPorFuncion(id);
            return nuevoCarrito;
        });
    };

    // Función para eliminar los boletos de una función específica.
    const eliminarDelCarritoBoletosPorFuncion = (id_funcion) => {
        setCarritoBoletos(prevBoletos => {
            const nuevosBoletos = prevBoletos.filter(boleto => boleto.id_funcion !== id_funcion);
            console.log(`Boletos eliminados para la función ID: ${id_funcion}`, nuevosBoletos);
            return nuevosBoletos;
        });
    };

    return (
        // El contexto es provisto a todos los componentes hijos.
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
        }}>
            {children}
        </CarritoContext.Provider>
    );
};

// Hook personalizado para usar el contexto en otros componentes.
export const useCarrito = () => {
    return useContext(CarritoContext);
};
