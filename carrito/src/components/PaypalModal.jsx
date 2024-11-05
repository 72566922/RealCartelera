import React, { useEffect, useState } from "react";
import "./paypal.css";

function PaypalModal({ showModal, handleModalToggle, cartItems, handleSell }) {
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    const calcularTotal = (items) => {
        return items.reduce((total, item) => total + (item.precio * item.cantidad), 0).toFixed(2);
    };

    useEffect(() => {
        // Mostrar por consola si el modal está abierto o cerrado
        if (showModal) {
            console.log("El modal de PayPal está abierto.");
        } else {
            console.log("El modal de PayPal está cerrado.");
        }

        if (showModal) {
            const paypalContainer = document.getElementById('paypal-button-container');
            paypalContainer.innerHTML = "";

            if (window.paypal) {
                const paypalButtons = window.paypal.Buttons({
                    style: {
                        color: 'blue',
                        shape: 'pill',
                        label: 'pay',
                    },
                    createOrder: async (data, actions) => {
                        const totalAmount = calcularTotal(cartItems);
                        return actions.order.create({
                            purchase_units: [{
                                amount: {
                                    value: totalAmount,
                                    breakdown: {
                                        item_total: {
                                            currency_code: 'USD',
                                            value: totalAmount,
                                        }
                                    }
                                },
                                items: cartItems.map(item => ({
                                    name: item.nombre,
                                    unit_amount: {
                                        currency_code: 'USD',
                                        value: item.precio.toFixed(2),
                                    },
                                    quantity: item.cantidad,
                                }))
                            }]
                        });
                    },
                    onApprove: async (data, actions) => {
                        await actions.order.capture();
                        handleSell();
                        setAlertMessage("¡Pago realizado exitosamente!");
                        setAlertVisible(true);
                        setTimeout(() => {
                            handleModalToggle(); // Cierra solo el modal de PayPal
                        }, 2000);
                    },
                    onError: (err) => {
                        console.error(err);
                        setAlertMessage("Error al procesar el pago. Intenta nuevamente.");
                        setAlertVisible(true);
                    }
                });

                paypalButtons.render(paypalContainer).catch(err => {
                    console.error("Error al renderizar el botón de PayPal:", err);
                });

                return () => {
                    paypalButtons.close();
                };
            }
        }
    }, [showModal, cartItems, handleSell, handleModalToggle]);

    return showModal ? (
        <div className="paypal-modal">
            <div className="paypal-modal-content">
                <h2>Resumen de Pago</h2>
                <p>Total a Pagar: S/. {calcularTotal(cartItems)}</p>
                <div id="paypal-button-container"></div>
                {alertVisible && (
                    <div className={`alert ${alertMessage.includes("exitosamente") ? "success" : "error"}`}>
                        {alertMessage}
                    </div>
                )}
                <button onClick={handleModalToggle}>Cerrar</button> {/* Cierra solo el modal de PayPal */}
            </div>
        </div>
    ) : null;
}

export default PaypalModal;
