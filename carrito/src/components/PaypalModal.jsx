import React, { useEffect, useState } from "react";
import "./paypal.css";

// Componente para manejar el modal de PayPal
function PaypalModal({ showModal, handleModalToggle, cartItems, handleSell }) {
    // Estado para controlar la visibilidad de una alerta
    const [alertVisible, setAlertVisible] = useState(false);
    // Estado para manejar el mensaje de la alerta
    const [alertMessage, setAlertMessage] = useState("");

    // Función para calcular el total de los artículos en el carrito
    const calcularTotal = (items) => {
        // Suma los precios multiplicados por las cantidades de cada artículo
        return items.reduce((total, item) => total + (item.precio * item.cantidad), 0).toFixed(2);
    };

    useEffect(() => {
        // Mostrar por consola si el modal está abierto o cerrado
        if (showModal) {
            console.log("El modal de PayPal está abierto.");
        } else {
            console.log("El modal de PayPal está cerrado.");
        }

        // Si el modal está abierto, inicializa el botón de PayPal
        if (showModal) {
            const paypalContainer = document.getElementById('paypal-button-container');
            // Limpia el contenedor para evitar botones duplicados
            paypalContainer.innerHTML = "";

            // Verifica si PayPal está disponible en el objeto global `window`
            if (window.paypal) {
                // Configura los botones de PayPal
                const paypalButtons = window.paypal.Buttons({
                    style: {
                        color: 'blue', // Color del botón
                        shape: 'pill', // Forma del botón
                        label: 'pay',  // Etiqueta del botón
                    },
                    // Configura el pedido cuando se crea
                    createOrder: async (data, actions) => {
                        const totalAmount = calcularTotal(cartItems); // Calcula el total
                        return actions.order.create({
                            purchase_units: [{
                                amount: {
                                    value: totalAmount, // Total a pagar
                                    breakdown: {
                                        item_total: {
                                            currency_code: 'USD', // Moneda
                                            value: totalAmount, // Total desglosado
                                        }
                                    }
                                },
                                items: cartItems.map(item => ({
                                    name: item.nombre, // Nombre del artículo
                                    unit_amount: {
                                        currency_code: 'USD', // Moneda
                                        value: item.precio.toFixed(2), // Precio unitario
                                    },
                                    quantity: item.cantidad, // Cantidad
                                }))
                            }]
                        });
                    },
                    // Acción a tomar si el pago es aprobado
                    onApprove: async (data, actions) => {
                        await actions.order.capture(); // Captura el pedido
                        handleSell(); // Llama a la función para manejar la venta
                        setAlertMessage("¡Pago realizado exitosamente!"); // Muestra mensaje de éxito
                        setAlertVisible(true);
                        // Cierra el modal después de 2 segundos
                        setTimeout(() => {
                            handleModalToggle();
                        }, 2000);
                    },
                    // Maneja errores durante el pago
                    onError: (err) => {
                        console.error(err); // Loguea el error
                        setAlertMessage("Error al procesar el pago. Intenta nuevamente."); // Muestra mensaje de error
                        setAlertVisible(true);
                    }
                });

                // Renderiza los botones de PayPal en el contenedor
                paypalButtons.render(paypalContainer).catch(err => {
                    console.error("Error al renderizar el botón de PayPal:", err);
                });

                // Limpia los botones de PayPal cuando el componente se desmonta
                return () => {
                    paypalButtons.close();
                };
            }
        }
    }, [showModal, cartItems, handleSell, handleModalToggle]); // Dependencias del efecto

    return showModal ? (
        <div className="paypal-modal">
            <div className="paypal-modal-content">
                <h2>Resumen de Pago</h2>
                {/* Muestra el total calculado */}
                <p>Total a Pagar: S/. {calcularTotal(cartItems)}</p>
                {/* Contenedor para los botones de PayPal */}
                <div id="paypal-button-container"></div>
                {/* Muestra una alerta si está visible */}
                {alertVisible && (
                    <div className={`alert ${alertMessage.includes("exitosamente") ? "success" : "error"}`}>
                        {alertMessage}
                    </div>
                )}
                {/* Botón para cerrar el modal */}
                <button onClick={handleModalToggle}>Cerrar</button>
            </div>
        </div>
    ) : null; // No renderiza nada si el modal está cerrado
}

export default PaypalModal;
