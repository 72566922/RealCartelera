import React, { useEffect } from "react";
import './styleHeader/modal.css'; // Importar el archivo CSS personalizado

function Modal({ showModal, handleModalToggle, cartItems, handleSell }) {
  useEffect(() => {
    if (showModal) {
      // Imprimir los artículos del carrito en la consola
      console.log("Artículos en el carrito:", cartItems);

      // Limpiar el contenedor antes de renderizar el botón de PayPal
      const paypalContainer = document.getElementById('paypal-button-container');
      paypalContainer.innerHTML = "";

      window.paypal.Buttons({
        style: {
          color: 'blue',
          shape: 'pill',
          label: 'pay',
        },
        createOrder: function (data, actions) {
          const totalAmount = cartItems.reduce((total, item) => total + item.precioTotal, 0);

          // Imprimir el monto total en la consola
          console.log("Total a pagar:", totalAmount.toFixed(2));

          // Crear un objeto con detalles de la orden para enviar al backend
          const orderDetails = {
            items: cartItems.map(item => ({
              nombre: item.dulce?.nombre,
              cantidad: item.cantidadSeleccionada,
              precioTotal: item.precioTotal,
            })),
            totalAmount: totalAmount.toFixed(2),
          };

          // Imprimir detalles de la orden
          console.log("Detalles de la orden:", orderDetails);

          return actions.order.create({
            purchase_units: [{
              amount: {
                value: totalAmount.toFixed(2), // Total del carrito
              },
            }],
          });
        },
        onApprove: function (data, actions) {
          return actions.order.capture().then(function (details) {
            // Imprimir detalles del pago completado
            console.log('Pago completado con éxito por ' + details.payer.name.given_name);
            console.log("Detalles de la transacción:", details);

            handleSell(); // Llamar a handleSell para completar la venta
            handleModalToggle(); // Cerrar el modal
          });
        },
        onError: function (err) {
          // Imprimir error si el pago falla
          console.error('Error en el pago: ', err);
        }
      }).render('#paypal-button-container');
    }
  }, [showModal, cartItems, handleSell, handleModalToggle]);

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
              <ul>
                {cartItems.length > 0 ? (
                  cartItems.map((item, index) => (
                    <li key={index}>
                      {item.dulce?.nombre} - {item.cantidadSeleccionada} unidades - ${item.precioTotal}
                    </li>
                  ))
                ) : (
                  <li>No hay artículos en el carrito.</li>
                )}
              </ul>

              {/* Contenedor para el botón de PayPal */}
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

export default Modal;
