import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCarrito } from '../components/context/CarritoContext';
import useBebidas from './hooks/useBebidas';
import useComidas from './hooks/useComidas';
import useBoletos from './hooks/useBoletos';
import PaypalModal from './PaypalModal';
import './ModalCarrito.css';  // Asegúrate de importar Bootstrap

const ModalCarrito = ({ isOpen, onClose }) => {

    const navigate = useNavigate();
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
    }, [carritoDulceria, carritoBoletos]);

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
            if (bebidas.length > 0) {
                const bebidasData = bebidas.map(item => ({
                    id: item.id_bebida,
                    cantidadVendida: item.cantidad
                }));
                await venderBebidas(bebidasData);
            }

            if (comidas.length > 0) {
                const comidasData = comidas.map(item => ({
                    id: item.id_comida,
                    cantidadVendida: item.cantidad
                }));
                await venderComidas(comidasData);
            }

            if (carritoBoletos.length > 0) {
                const boletosData = carritoBoletos.map(boleto => ({
                    funcion: { id_funcion: boleto.id_funcion },
                    asiento: { id_asiento: boleto.id_asiento },
                    usuario: { id: usuarioId }
                }));
                await Promise.all(boletosData.map(boleto => registrarBoleto(boleto)));
            }
            limpiarCarrito();
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
            if (carritoBoletos.length > 0) {
                setMostrarPaypalModal(true);
            } else {
                alert("Real Cartelera solo permite la compra de dulces si viene al menos con un boleto.");
                onClose();
                navigate('/pelicula');
            }
        } else {
            alert("Debe iniciar sesión para continuar con el pago.");
            onClose();
            navigate('/login');
        }
    };

    return (
        <div className={`modal fade ${isOpen ? 'show' : ''}`} tabIndex="-1" role="dialog" aria-labelledby="carritoModalLabel" aria-hidden={!isOpen}>
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="carritoModalLabel">Carrito de Compras</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={onClose}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <h3>Total: $/. {calcularTotal()}</h3>
                        <h5>ID de Usuario: {usuarioId}</h5>

                        <div className="productos-carrito">
                            {carritoDulceria.length === 0 && carritoFunciones.length === 0 && carritoBoletos.length === 0 ? (
                                <p>No hay productos en el carrito.</p>
                            ) : (
                                <>
                                    <h5>Comidas:</h5>
                                    {carritoDulceria.filter(item => item.gramos > 0).map((item) => (
                                        <div key={`comida-${item.id}`} className="d-flex justify-content-between align-items-center mb-3">
                                            <span>{item.nombre} - $/. {item.precio} x {item.cantidad} = $/. {(item.precio * item.cantidad).toFixed(2)}</span>
                                            <button className="btn btn-danger" onClick={() => eliminarDelCarritoDulceria(item.id)}>Eliminar</button>
                                        </div>
                                    ))}

                                    <h5>Bebidas:</h5>
                                    {carritoDulceria.filter(item => item.litros > 0).map((item) => (
                                        <div key={`bebida-${item.id}`} className="d-flex justify-content-between align-items-center mb-3">
                                            <span>{item.nombre} - $/. {item.precio} x {item.cantidad} = $/. {(item.precio * item.cantidad).toFixed(2)}</span>
                                            <button className="btn btn-danger" onClick={() => eliminarDelCarritoDulceria(item.id)}>Eliminar</button>
                                        </div>
                                    ))}

                                    <h5>Funciones:</h5>
                                    {carritoFunciones.map((funcion) => (
                                        <div key={`funcion-${funcion.id}`} className="mb-4">
                                            <h6>Funcion: {funcion.nombre} - {funcion.sede} - {funcion.sala} - {funcion.hora}</h6>
                                            <h6>Boletos:</h6>
                                            {boletosAgrupados[funcion.id] ? boletosAgrupados[funcion.id].map((boleto) => (
                                                <div key={`boleto-${boleto.id_asiento}`} className="mb-2">
                                                    <span>Asiento {boleto.nombre} - Precio $/. {boleto.precio}</span>
                                                </div>
                                            )) : <p>No hay boletos para esta función.</p>}
                                            <button className="btn btn-danger" onClick={() => eliminarDelCarritoFunciones(funcion.id)}>Eliminar Función</button>
                                        </div>
                                    ))}
                                </>
                            )}
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-secondary" onClick={onClose}>Cerrar</button>
                        <button className="btn btn-primary" onClick={handlePaypalClick}>Pagar con PayPal</button>
                    </div>
                </div>
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
