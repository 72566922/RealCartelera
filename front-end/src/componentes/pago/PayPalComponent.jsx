import React, { useEffect } from "react";

function PayPalModal({ cartItems, handleModalToggle, handleSell }) {
  useEffect(() => {
    console.log("useEffect ejecutado"); // Indica que se está ejecutando useEffect
    console.log(`Número de artículos en el carrito: ${cartItems.length}`); // Muestra el número de artículos en el carrito

    // Verifica si hay elementos en el carrito
    if (cartItems.length > 0) {
      // Limpia el contenedor del botón de PayPal antes de renderizar
      const paypalContainer = document.getElementById('paypal-button-container');
      paypalContainer.innerHTML = ''; // Limpia el contenido del contenedor
      console.log("Contenedor de PayPal limpiado"); // Indica que el contenedor ha sido limpiado

      // Configura el botón de PayPal
      window.paypal.Buttons({
        style: {
          color: 'blue',
          shape: 'pill',
          label: 'pay',
        },
        createOrder: function (data, actions) {
          // Calcula el total del carrito
          const totalAmount = cartItems.reduce((total, item) => total + item.precioTotal, 0);
          console.log(`Monto total a pagar: $${totalAmount.toFixed(2)}`); // Muestra el monto total a pagar
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: totalAmount.toFixed(2),
              },
            }],
          });
        },
        onApprove: function (data, actions) {
          return actions.order.capture().then(function (details) {
            console.log('Pago completado con éxito por ' + details.payer.name.given_name);
            handleSell(); // Llama a la función de venta
            handleModalToggle(); // Cierra el modal de PayPal
          });
        },
        onError: function (err) {
          console.error('Error en el pago: ', err);
        }
      }).render('#paypal-button-container'); // Renderiza el botón en el contenedor
      console.log("Botón de PayPal renderizado"); // Indica que el botón ha sido renderizado
    }
  }, [cartItems, handleSell, handleModalToggle]); // Dependencias del efecto

  return (
    <div className="modal show" style={{ display: "block" }} onClick={handleModalToggle}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Confirmar Pago</h5>
            <button type="button" className="btn-close" onClick={handleModalToggle} aria-label="Close">X</button>
          </div>
          <div className="modal-body">
            <div id="paypal-button-container"></div> {/* Contenedor para el botón de PayPal */}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={handleModalToggle}>
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PayPalModal;
