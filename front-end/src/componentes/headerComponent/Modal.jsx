import React from "react";

function Modal({ showModal, handleModalToggle, cartItems, handleSell }) {
  // Imprimir los datos del carrito en la consola
  console.log("Artículos en el carrito:", cartItems);

  const handleSellClick = () => {
    // Imprimir los datos que se van a vender
    console.log("Artículos a vender:", cartItems);
    handleSell(); // Llama a la función handleSell después de imprimir
  };

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
              <p>Aquí puedes ver los artículos en tu carrito:</p>
              <ul>
                {cartItems.length > 0 ? (
                  cartItems.map((item, index) => {
                    console.log(`Ítem en carrito: ${item.dulce?.nombre}, Cantidad: ${item.cantidadSeleccionada}, Precio total: ${item.precioTotal}`);
                    return (
                      <li key={index}>
                        {item.dulce?.nombre} - {item.cantidadSeleccionada} unidades - ${item.precioTotal}
                      </li>
                    );
                  })
                ) : (
                  <li>No hay artículos en el carrito.</li>
                )}
              </ul>
              <button type="button" className="btn btn-success" onClick={handleSellClick}>
                Vender
              </button>
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
