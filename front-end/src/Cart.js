import BebidaService from './services/BebidaService'; // Importa el servicio para manejar las bebidas
import ComidaService from './services/ComidaService'; // Importa el servicio para manejar la comida
import AsientoService from './services/AsientoService';

const Cart = {
  // Método para agregar una bebida al carrito
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

  // Método para agregar comida al carrito
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

  // Método para agregar asientos al carrito
  addToCartAsiento(asiento, cart, setCart) {
    // Busca el índice del asiento existente en el carrito por su ID
    const existingItemIndex = cart.findIndex(cartItem => cartItem.id_asiento === asiento.id_asiento);

    // Si el asiento ya existe en el carrito
    if (existingItemIndex >= 0) {
      const updatedCart = [...cart];
      // Aumenta la cantidad de asientos (en este caso podría no ser necesario, dependerá de la lógica de negocio)
      updatedCart[existingItemIndex].cantidadSeleccionada += asiento.cantidadSeleccionada;
      setCart(updatedCart);
    } else {
      // Si el asiento no existe, agrega el nuevo asiento al carrito
      setCart([...cart, asiento]);
    }
  },

  // Método para manejar la venta de bebidas, comidas y asientos
  handleSell(cart, setCart, fetchBebidas, fetchComidas, fetchAsientos) {
    const ventasBebidas = cart.filter(item => item.id_bebida).map(item => ({
      id: item.id_bebida,
      cantidadVendida: item.cantidadSeleccionada,
    }));

    const ventasComidas = cart.filter(item => item.id_comida).map(item => ({
      id: item.id_comida,
      cantidadVendida: item.cantidadSeleccionada,
    }));

    const ventasAsientos = cart.filter(item => item.id_asiento).map(item => ({
      id: item.id_asiento,
      cantidadVendida: item.cantidadSeleccionada,
    }));

    BebidaService.venderBebidas(ventasBebidas)
      .then(() => ComidaService.venderComidas(ventasComidas))
      .then(() => {
        // Aquí puedes implementar la lógica para la venta de asientos
        return AsientoService.venderAsientos(ventasAsientos);
      })
      .then(() => {
        setCart([]); 
        fetchBebidas(); 
        fetchComidas(); 
        fetchAsientos(); // Refresca la lista de asientos
      })
      .catch(error => console.error("Error al realizar la venta:", error));
  }
};

export default Cart;
