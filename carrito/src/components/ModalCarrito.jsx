import React, { useState, useCallback, useEffect } from 'react';
import { useCarrito } from '../components/context/CarritoContext';
import useBebidas from './hooks/useBebidas';
import useComidas from './hooks/useComidas';
import useBoletos from './hooks/useBoletos';
import PaypalModal from './PaypalModal';
import './ModalCarrito.css';

const ModalCarrito = ({ isOpen, onClose }) => {
    const {
        carritoDulceria,
        carritoFunciones,
        carritoBoletos,
        limpiarCarrito,
        eliminarDelCarritoDulceria,
        eliminarDelCarritoFunciones,
        eliminarDelCarritoBoletos
    } = useCarrito();

    const { venderBebidas } = useBebidas();
    const { venderComidas } = useComidas();
    const { registrarBoleto } = useBoletos();

    const [mostrarPaypalModal, setMostrarPaypalModal] = useState(false);
    const usuarioId = Number(localStorage.getItem('usuarioId'));

    const calcularTotal = useCallback(() => {
        const totalDulceria = carritoDulceria.reduce((total, item) => total + (item.precio * item.cantidad), 0);
        const totalBoletos = carritoBoletos.reduce((total, boleto) => {
            const funcion = carritoFunciones.find(f => f.id === boleto.id_funcion);
            return total + (funcion ? funcion.precio : 0);
        }, 0);

        return (totalDulceria + totalBoletos).toFixed(2);
    }, [carritoDulceria, carritoFunciones, carritoBoletos]);

    useEffect(() => {
        if (isOpen) {
            console.log("Modal Carrito abierto");
        }
    }, [isOpen]);

    const handlePaymentSuccess = async () => {
        const bebidas = carritoDulceria.filter(item => item.litros > 0);
        const comidas = carritoDulceria.filter(item => item.gramos > 0);

        console.log("Productos a vender:");
        console.log("Bebidas:", bebidas);
        console.log("Comidas:", comidas);
        console.log("Boletos:", carritoBoletos);

        try {
            const ventas = [];

            // Imprimir lo que se enviará para las bebidas
            if (bebidas.length > 0) {
                const bebidasData = bebidas.map(item => ({
                    id: item.id_bebida,
                    cantidadVendida: item.cantidad
                }));
                console.log("Datos de Bebidas a enviar:", bebidasData);
                await venderBebidas(bebidasData);
            }

            // Imprimir lo que se enviará para las comidas
            if (comidas.length > 0) {
                const comidasData = comidas.map(item => ({
                    id: item.id_comida,
                    cantidadVendida: item.cantidad
                }));
                console.log("Datos de Comidas a enviar:", comidasData);
                await venderComidas(comidasData);
            }

            // Imprimir lo que se enviará para los boletos
            if (carritoBoletos.length > 0) {
                const boletosData = carritoBoletos.map(boleto => ({
                    funcion: { id_funcion: boleto.id_funcion },
                    asiento: { id_asiento: boleto.id_asiento },
                    usuario: { id: usuarioId }
                }));
                console.log("Datos de Boletos a enviar:", boletosData);
                await Promise.all(
                    boletosData.map(boleto => registrarBoleto(boleto))
                );
            }

            ventas.push(...bebidas.map(item => ({
                id: item.id_bebida,
                tipo: 'Bebida',
                nombre: item.nombre,
                cantidad: item.cantidad,
                precioUnitario: item.precio,
                total: (item.precio * item.cantidad).toFixed(2)
            })));

            ventas.push(...comidas.map(item => ({
                id: item.id_comida,
                tipo: 'Comida',
                nombre: item.nombre,
                cantidad: item.cantidad,
                precioUnitario: item.precio,
                total: (item.precio * item.cantidad).toFixed(2)
            })));

            // Procesar los boletos si los hay
            ventas.push(...carritoBoletos.map(boleto => {
                const funcion = carritoFunciones.find(f => f.id === Number(boleto.id_funcion));
                return {
                    tipo: 'Boleto',
                    funcion: { id_funcion: boleto.id_funcion, nombre: funcion ? funcion.nombre : 'Desconocido', precio: funcion ? funcion.precio : 0 },
                    asiento: { id_asiento: boleto.id_asiento },
                    usuario: { id: usuarioId }
                };
            }));

            limpiarCarrito();

            // Refrescar la página después de 2 segundos (2000 milisegundos)
            setTimeout(() => {
                window.location.reload();
            }, 8000);

        } catch (error) {
            console.error("Error al actualizar el stock:", error);
        }
    };

    // Agrupar boletos por id_funcion
    const boletosAgrupados = carritoBoletos.reduce((acc, boleto) => {
        if (!acc[boleto.id_funcion]) {
            acc[boleto.id_funcion] = [];
        }
        acc[boleto.id_funcion].push(boleto);
        return acc;
    }, {});

    return (
        <div className={`modal ${isOpen ? 'open' : ''}`} onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>Carrito de Compras</h2>
                <button onClick={onClose}>Cerrar</button>
                <h3>Total: S/. {calcularTotal()}</h3>
                <h4>ID de Usuario: {usuarioId}</h4>

                <div className="productos-carrito">
                    <h4>Productos en el Carrito:</h4>
                    {carritoDulceria.length === 0 && carritoFunciones.length === 0 && carritoBoletos.length === 0 ? (
                        <p>No hay productos en el carrito.</p>
                    ) : (
                        <>
                            <h5>Comidas:</h5>
                            {carritoDulceria.filter(item => item.gramos > 0).map((item) => (
                                <div key={`comida-${item.id}`}>
                                    <span>{item.nombre} - S/. {item.precio} x {item.cantidad} = S/. {(item.precio * item.cantidad).toFixed(2)}</span>
                                    <button onClick={() => eliminarDelCarritoDulceria(item.id)}>Eliminar</button>
                                </div>
                            ))}
                            
                            <h5>Bebidas:</h5>
                            {carritoDulceria.filter(item => item.litros > 0).map((item) => (
                                <div key={`bebida-${item.id}`}>
                                    <span>{item.nombre} - S/. {item.precio} x {item.cantidad} = S/. {(item.precio * item.cantidad).toFixed(2)}</span>
                                    <button onClick={() => eliminarDelCarritoDulceria(item.id)}>Eliminar</button>
                                </div>
                            ))}

                            <h5>Funciones:</h5>
                            {carritoFunciones.map((funcion) => (
                                <div key={`funcion-${funcion.id}`}>
                                    <span> ID Funcion: {funcion.id} - {funcion.nombre}</span>
                                    <button onClick={() => eliminarDelCarritoFunciones(funcion.id)}>Eliminar</button>
                                </div>
                            ))}

                            <h5>Boletos:</h5>
                            {Object.keys(boletosAgrupados).map((id_funcion) => {
                                //const funcion = carritoFunciones.find(f => f.id === Number(id_funcion));
                                // const precioFuncion = funcion ? funcion.precio : 0;

                                return (
                                    <div key={`boletos-funcion-${id_funcion}`}>
                                        {boletosAgrupados[id_funcion].map((boleto) => (
                                            <div key={`boleto-${boleto.id_asiento}-${boleto.id_funcion}`}>
                                                <span>Asiento: {boleto.id_asiento} - S/. {boleto.precio}</span>
                                                <button onClick={() => eliminarDelCarritoBoletos(boleto.id_asiento, boleto.id_funcion)}>Eliminar</button>
                                            </div>
                                        ))}
                                    </div>
                                );
                            })}
                        </>
                    )}
                </div>

                <button onClick={() => setMostrarPaypalModal(true)}>Pagar con PayPal</button>
                {mostrarPaypalModal && <PaypalModal onSuccess={handlePaymentSuccess} />}
            </div>

            <PaypalModal
                showModal={mostrarPaypalModal}
                handleModalToggle={() => setMostrarPaypalModal(false)}
                cartItems={carritoDulceria.concat(carritoFunciones).concat(carritoBoletos)}
                handleSell={handlePaymentSuccess}
                usuarioId={usuarioId}
                total={calcularTotal()}
            />
        </div>
    );
};

export default ModalCarrito;
