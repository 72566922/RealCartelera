import React, { useEffect } from "react";

function Modal({ showModal, handleModalToggle, cartItems, handleSell }) {
  useEffect(() => {
    if (showModal) {
      window.paypal.Buttons({
        style: {
          color: 'blue',
          shape: 'pill',
          label: 'pay',
        },
        createOrder: function (data, actions) {
          const totalAmount = cartItems.reduce((total, item) => total + item.precioTotal, 0);
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
            console.log('Pago completado con éxito por ' + details.payer.name.given_name);
            handleSell(); // Llamar a handleSell para completar la venta
            handleModalToggle(); // Cerrar el modal
          });
        },
        onError: function (err) {
          console.error('Error en el pago: ', err);
        }
      }).render('#paypal-button-container');
    }
  }, [showModal, cartItems, handleSell, handleModalToggle]);

  return (
    showModal && (
      <div className="modal show" style={{ display: "block" }} onClick={handleModalToggle}>
        <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
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
