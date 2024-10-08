import BebidaService from './services/BebidaService'; // Importa el servicio para manejar las bebidas
import ComidaService from './services/ComidaService'; // Importa el servicio para manejar la comida

const Cart = {
  // Método para agregar una bebida al carrito
  addToCartBebida(bebida, cart, setCart) {
    // Busca el índice del elemento existente en el carrito por su ID de bebida
    const existingItemIndex = cart.findIndex(cartItem => cartItem.id_bebida === bebida.id_bebida);

    // Si el elemento ya existe en el carrito
    if (existingItemIndex >= 0) {
      // Crea una copia del carrito
      const updatedCart = [...cart];
      // Aumenta la cantidad seleccionada y el precio total del elemento existente
      updatedCart[existingItemIndex].cantidadSeleccionada += bebida.cantidadSeleccionada;
      updatedCart[existingItemIndex].precioTotal += bebida.precioTotal;
      // Actualiza el estado del carrito con el carrito modificado
      setCart(updatedCart);
    } else {
      // Si el elemento no existe, agrega la nueva bebida al carrito
      setCart([...cart, bebida]);
    }
  },

  // Método para agregar comida al carrito
  addToCartComida(comida, cart, setCart) {
    // Busca el índice del elemento existente en el carrito por su ID de comida
    const existingItemIndex = cart.findIndex(cartItem => cartItem.id_comida === comida.id_comida);

    // Si el elemento ya existe en el carrito
    if (existingItemIndex >= 0) {
      // Crea una copia del carrito
      const updatedCart = [...cart];
      // Aumenta la cantidad seleccionada y el precio total del elemento existente
      updatedCart[existingItemIndex].cantidadSeleccionada += comida.cantidadSeleccionada;
      updatedCart[existingItemIndex].precioTotal += comida.precioTotal;
      // Actualiza el estado del carrito con el carrito modificado
      setCart(updatedCart);
    } else {
      // Si el elemento no existe, agrega la nueva comida al carrito
      setCart([...cart, comida]);
    }
  },

  // Método para manejar la venta de bebidas y comidas
  handleSell(cart, setCart, fetchBebidas, fetchComidas) {
    // Filtra los elementos de bebida en el carrito y crea un arreglo de ventas de bebidas
    const ventasBebidas = cart.filter(item => item.id_bebida).map(item => ({
      id: item.id_bebida, // Obtiene el ID de la bebida
      cantidadVendida: item.cantidadSeleccionada, // Obtiene la cantidad vendida
    }));

    // Filtra los elementos de comida en el carrito y crea un arreglo de ventas de comidas
    const ventasComidas = cart.filter(item => item.id_comida).map(item => ({
      id: item.id_comida, // Obtiene el ID de la comida
      cantidadVendida: item.cantidadSeleccionada, // Obtiene la cantidad vendida
    }));

    // Llama al servicio de bebidas para procesar la venta
    BebidaService.venderBebidas(ventasBebidas)
      // Una vez que se complete la venta de bebidas, llama al servicio de comida
      .then(() => ComidaService.venderComidas(ventasComidas))
      .then(() => {
        // Vacía el carrito después de realizar la venta
        setCart([]); 
        // Refresca la lista de bebidas
        fetchBebidas(); 
        // Refresca la lista de comidas
        fetchComidas(); 
      })
      // Maneja cualquier error que pueda ocurrir durante el proceso de venta
      .catch(error => console.error("Error al realizar la venta:", error));
  }
};

export default Cart; // Exporta el objeto Cart para ser utilizado en otras partes de la aplicación
