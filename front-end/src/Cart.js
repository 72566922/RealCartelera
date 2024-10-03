import BebidaService from './services/BebidaService';
import ComidaService from './services/ComidaService';

const Cart = {
  addToCartBebida(bebida, cart, setCart) {
    const existingItemIndex = cart.findIndex(cartItem => cartItem.id_bebida === bebida.id_bebida);

    if (existingItemIndex >= 0) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].cantidadSeleccionada += bebida.cantidadSeleccionada;
      updatedCart[existingItemIndex].precioTotal += bebida.precioTotal;
      setCart(updatedCart);
    } else {
      setCart([...cart, bebida]);
    }
  },

  addToCartComida(comida, cart, setCart) {
    const existingItemIndex = cart.findIndex(cartItem => cartItem.id_comida === comida.id_comida);

    if (existingItemIndex >= 0) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].cantidadSeleccionada += comida.cantidadSeleccionada;
      updatedCart[existingItemIndex].precioTotal += comida.precioTotal;
      setCart(updatedCart);
    } else {
      setCart([...cart, comida]);
    }
  },

  handleSell(cart, setCart, fetchBebidas, fetchComidas) { // Aceptar setCart aquí
    const ventasBebidas = cart.filter(item => item.id_bebida).map(item => ({
      id: item.id_bebida,
      cantidadVendida: item.cantidadSeleccionada,
    }));

    const ventasComidas = cart.filter(item => item.id_comida).map(item => ({
      id: item.id_comida,
      cantidadVendida: item.cantidadSeleccionada,
    }));

    BebidaService.venderBebidas(ventasBebidas)
      .then(() => ComidaService.venderComidas(ventasComidas))
      .then(() => {
        setCart([]); // Vacía el carrito después de la venta
        fetchBebidas(); // Refresca la lista de bebidas
        fetchComidas(); // Refresca la lista de comidas
      })
      .catch(error => console.error("Error al realizar la venta:", error));
  }
};

export default Cart;
