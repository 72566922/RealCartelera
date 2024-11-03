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
        eliminarDelCarritoFunciones
    } = useCarrito();

    const { venderBebidas } = useBebidas();
    const { venderComidas } = useComidas();
    const { registrarBoleto } = useBoletos();

    const [mostrarPaypalModal, setMostrarPaypalModal] = useState(false);
    const usuarioId = Number(localStorage.getItem('usuarioId'));

    const calcularTotal = useCallback(() => {
        const totalDulceria = carritoDulceria.reduce((total, item) => total + (item.precio * item.cantidad), 0);
        const totalBoletos = carritoBoletos.reduce((total, item) => total + (item.precio * item.cantidad), 0);
        
        return (totalDulceria + totalBoletos).toFixed(2);
    }, [carritoDulceria,carritoBoletos]);

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

            if (bebidas.length > 0) {
                const bebidasData = bebidas.map(item => ({
                    id: item.id_bebida,
                    cantidadVendida: item.cantidad
                }));
                console.log("Datos de Bebidas a enviar:", bebidasData);
                await venderBebidas(bebidasData);
            }

            if (comidas.length > 0) {
                const comidasData = comidas.map(item => ({
                    id: item.id_comida,
                    cantidadVendida: item.cantidad
                }));
                console.log("Datos de Comidas a enviar:", comidasData);
                await venderComidas(comidasData);
            }

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

            setTimeout(() => {
                window.location.reload();
            }, 8000);

        } catch (error) {
            console.error("Error al actualizar el stock:", error);
        }
    };

    const boletosAgrupados = carritoBoletos.reduce((acc, boleto) => {
        if (!acc[boleto.id_funcion]) {
            acc[boleto.id_funcion] = [];
        }
        acc[boleto.id_funcion].push(boleto);
        return acc;
    }, {});

    const handlePaypalClick = () => {
        if (usuarioId) {
            setMostrarPaypalModal(true);
        } else {
            alert("Debe iniciar sesión para continuar con el pago.");
        }
    };

    return (
        <div className={`modal ${isOpen ? 'open' : ''}`} onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>Carrito de Compras</h2>
                <button onClick={onClose}>Cerrar</button>
                <h3>Total: $/. {calcularTotal()}</h3>
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
                                    <span>{item.nombre} - $/. {item.precio} x {item.cantidad} = $/. {(item.precio * item.cantidad).toFixed(2)}</span>
                                    <button onClick={() => eliminarDelCarritoDulceria(item.id)}>Eliminar</button>
                                </div>
                            ))}
                            
                            <h5>Bebidas:</h5>
                            {carritoDulceria.filter(item => item.litros > 0).map((item) => (
                                <div key={`bebida-${item.id}`}>
                                    <span>{item.nombre} - $/. {item.precio} x {item.cantidad} = $/. {(item.precio * item.cantidad).toFixed(2)}</span>
                                    <button onClick={() => eliminarDelCarritoDulceria(item.id)}>Eliminar</button>
                                </div>
                            ))}

                            
                            {carritoFunciones.map((funcion) => (
                                <div key={`funcion-${funcion.id}`}>
                                    <h3>Funcion:</h3>
                                    <span>ID Funcion: {funcion.id} - {funcion.sede} - {funcion.sala} - {funcion.nombre} - {funcion.hora}</span>
                                    <h6>Boletos:</h6>
                                    {boletosAgrupados[funcion.id] ? boletosAgrupados[funcion.id].map((boleto) => (
                                        <div key={`boleto-${boleto.id_asiento}-${boleto.id_funcion}`}>
                                            <span>ID: {boleto.id_asiento} - Asiento {boleto.nombre} - Precio $/. {boleto.precio}</span>
                                        </div>
                                    )) : <p>No hay boletos para esta función.</p>}
                                    <button onClick={() => eliminarDelCarritoFunciones(funcion.id)}>Eliminar Función</button>
                                </div>
                            ))}
                        </>
                    )}
                </div>

                <button onClick={handlePaypalClick}>Pagar con PayPal</button>
                {mostrarPaypalModal && <PaypalModal onSuccess={handlePaymentSuccess} />}
            </div>

            {mostrarPaypalModal && (
                <PaypalModal
                    showModal={mostrarPaypalModal}
                    handleModalToggle={() => setMostrarPaypalModal(false)}
                    cartItems={carritoDulceria.concat(carritoFunciones).concat(carritoBoletos)}
                    handleSell={handlePaymentSuccess}
                    usuarioId={usuarioId}
                    total={calcularTotal()}
                />
            )}
        </div>
    );
};

export default ModalCarrito;
