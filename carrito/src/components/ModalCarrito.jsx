import React, { useState, useCallback } from 'react';
import { useCarrito } from '../components/context/CarritoContext';
import useBebidas from './hooks/useBebidas';
import useComidas from './hooks/useComidas';
import useBoletos from './hooks/useBoletos'; // Asegúrate de importar useBoletos para la venta de boletos
import PaypalModal from './PaypalModal';
import ListaProductos from './ListaProductos';
import './ModalCarrito.css';

const ModalCarrito = ({ isOpen, onClose }) => {
    const { carritoDulceria, carritoFunciones, carritoBoletos, limpiarCarrito } = useCarrito();
    const { venderBebidas } = useBebidas();
    const { venderComidas } = useComidas();
    const { registrarBoleto } = useBoletos(); // Nueva función para vender boletos

    const [mostrarPaypalModal, setMostrarPaypalModal] = useState(false);
    const [ventasRealizadas, setVentasRealizadas] = useState([]);

    // ID de usuario almacenado en localStorage
    const usuarioId = Number(localStorage.getItem('usuarioId'));


    // Función para calcular el total del carrito
    const calcularTotal = useCallback(() => {
        const totalDulceria = carritoDulceria.reduce((total, item) => total + (item.precio * item.cantidad), 0);
        const totalFunciones = carritoFunciones.reduce((total, item) => total + (item.precio * item.cantidad), 0);
        const totalBoletos = carritoBoletos.reduce((total, boleto) => {
            const funcion = carritoFunciones.find(f => f.id === boleto.id_funcion);
            return total + (funcion ? funcion.precio : 0);
        }, 0);

        return (totalDulceria + totalBoletos).toFixed(2);
    }, [carritoDulceria, carritoFunciones, carritoBoletos]);

    // Maneja el éxito del pago al actualizar el stock
    const handlePaymentSuccess = async () => {
        const bebidas = carritoDulceria.filter(item => item.litros > 0);
        const comidas = carritoDulceria.filter(item => item.gramos > 0);

        try {
            const ventas = [];

            // Procesar todas las ventas en paralelo
            await Promise.all([
                bebidas.length > 0 && venderBebidas(bebidas.map(item => ({
                    id: item.id,
                    cantidadVendida: item.cantidad,
                    usuarioId
                }))),
                comidas.length > 0 && venderComidas(comidas.map(item => ({
                    id: item.id,
                    cantidadVendida: item.cantidad,
                    usuarioId
                }))),
                carritoBoletos.length > 0 && Promise.all(
                    carritoBoletos.map(boleto => registrarBoleto({
                        funcion: { id_funcion: boleto.id_funcion },
                        asiento: { id_asiento: boleto.id_asiento },
                        usuario: { id: usuarioId }
                    }))
                )
            ]);

            // Agregar detalles de ventas realizadas
            ventas.push(...bebidas.map(item => ({
                tipo: 'Bebida',
                nombre: item.nombre,
                cantidad: item.cantidad,
                precioUnitario: item.precio,
                total: (item.precio * item.cantidad).toFixed(2)
            })));

            ventas.push(...comidas.map(item => ({
                tipo: 'Comida',
                nombre: item.nombre,
                cantidad: item.cantidad,
                precioUnitario: item.precio,
                total: (item.precio * item.cantidad).toFixed(2)
            })));

            ventas.push(...carritoBoletos.map(boleto => ({
                tipo: 'Boleto',
                funcion: { id_funcion: boleto.id_funcion },
                asiento: { id_asiento: boleto.id_asiento },
                usuario: { id: usuarioId }
            })));

            setVentasRealizadas(ventas);
            limpiarCarrito();
            setMostrarPaypalModal(false);
        } catch (error) {
            console.error("Error al actualizar el stock:", error);
        }
    };


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
                                <div key={item.id}>
                                    <ListaProductos productos={[item]} tipo="Comida" />
                                    <p>Cantidad: {item.cantidad}</p>
                                </div>
                            ))}

                            <h5>Bebidas:</h5>
                            {carritoDulceria.filter(item => item.litros > 0).map((item) => (
                                <div key={item.id}>
                                    <ListaProductos productos={[item]} tipo="Bebida" />
                                    <p>Cantidad: {item.cantidad}</p>
                                </div>
                            ))}

                            <h5>Boletos:</h5>
                            {carritoBoletos.map((boleto) => {
                                const funcion = carritoFunciones.find(f => f.id === boleto.id_funcion);
                                return (
                                    <div key={boleto.id_asiento}>
                                        <p>Asiento ID: {boleto.id_asiento}</p>
                                        <p>Función ID: {boleto.id_funcion}</p>
                                        <p>Película: {funcion ? funcion.nombre : 'No disponible'}</p>
                                    </div>
                                );
                            })}
                        </>
                    )}
                </div>

                <button onClick={() => setMostrarPaypalModal(true)}>Continuar a Pago</button>
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
