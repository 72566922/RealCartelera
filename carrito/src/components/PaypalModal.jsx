import React, { useEffect, useState } from "react";

function PaypalModal({ showModal, handleModalToggle, cartItems, handleSell }) {
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    const calcularTotal = (items) => {
        return items.reduce((total, item) => total + (item.precio * item.cantidad), 0).toFixed(2);
    };

    useEffect(() => {
        if (showModal) {
            const paypalContainer = document.getElementById('paypal-button-container');
            paypalContainer.innerHTML = "";

            if (window.paypal) {
                window.paypal.Buttons({
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
                        const details = await actions.order.capture();
                        await handleSell(); // Espera a que la venta se procese

                        setAlertMessage("¡Pago realizado con éxito!");
                        setAlertVisible(true);

                        // Si deseas mantener el modal abierto después del pago, no cierres aquí.
                        // Puedes agregar un botón para que el usuario cierre el modal manualmente.
                    },
                    onError: (err) => {
                        console.error('Error en el pago:', err);
                        alert('Ha ocurrido un error al procesar el pago. Por favor, inténtalo de nuevo.');
                    }
                }).render('#paypal-button-container');
            } else {
                console.error('PayPal SDK no está cargado.');
                alert('El sistema de pagos no está disponible en este momento.');
            }
        }
    }, [showModal, cartItems, handleSell]);

    return (
        showModal && (
            <div className="modal show" style={{ display: "block" }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Carrito de Compras</h5>
                            <button type="button" className="btn-close" onClick={handleModalToggle} aria-label="Close">X</button>
                        </div>
                        <div className="modal-body">
                            {alertVisible && <div className="alert alert-success">{alertMessage}</div>}
                            <h5>Total a Pagar: ${calcularTotal(cartItems)}</h5>
                            <ul>
                                {cartItems.length > 0 ? (
                                    cartItems.map((item, index) => (
                                        <li key={index}>
                                            {item.nombre} -  ${item.precio * item.cantidad}
                                        </li>
                                    ))
                                ) : (
                                    <li>No hay artículos en el carrito.</li>
                                )}
                            </ul>
                            <div id="paypal-button-container"></div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={handleModalToggle}>
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
}

export default PaypalModal;
