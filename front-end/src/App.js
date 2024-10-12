import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Header from './componentes/headerComponent/header';
import Footer from './componentes/footer';
import RoutesComponent from './componentes/headerComponent/Route';
import ApiService from './services/ApiService';
import Cart from './Cart';

function App() {
  // Definición de estados para manejar el estado de la aplicación:
  const [bebidas, setBebidas] = useState([]); // Estado para almacenar la lista de bebidas.
  const [comidas, setComidas] = useState([]); // Estado para almacenar la lista de comidas.
  const [cart, setCart] = useState([]); // Estado para manejar el carrito de compras.
  const [loading, setLoading] = useState(true); // Estado para indicar si la aplicación está en proceso de carga.
  const [error, setError] = useState(null); // Estado para almacenar cualquier error que ocurra.

  // Hook de efecto que se ejecuta al montar el componente. Llama a las funciones para obtener los datos de bebidas y comidas.
  useEffect(() => {
    fetchBebidas();
    fetchComidas();
  }, []);

  // Función asíncrona para obtener la lista de bebidas desde la API.
  const fetchBebidas = async () => {
    try {
      const response = await ApiService.getAllBebidas(); // Llamada a la API mediante el servicio ApiService.
      setBebidas(response.data); // Almacena los datos obtenidos en el estado de 'bebidas'.
    } catch (error) {
      setError('Error al obtener las bebidas'); // Si ocurre un error, se almacena en el estado 'error'.
      console.error(error); // Muestra el error en la consola.
    }
  };

  // Función asíncrona para obtener la lista de comidas desde la API.
  const fetchComidas = async () => {
    try {
      const response = await ApiService.getAllComidas(); // Llamada a la API mediante el servicio ApiService.
      setComidas(response.data); // Almacena los datos obtenidos en el estado de 'comidas'.
    } catch (error) {
      setError('Error al obtener las comidas'); // Si ocurre un error, se almacena en el estado 'error'.
      console.error(error); // Muestra el error en la consola.
    } finally {
      setLoading(false); // Al finalizar la llamada, independientemente del resultado, se establece 'loading' en falso.
    }
  };

  // Función para manejar la venta de los productos en el carrito.
  const handleSell = () => {
    // Llama a la función 'handleSell' del componente 'Cart' y realiza las siguientes acciones:
    // 1. Procesa la venta del carrito actual.
    // 2. Limpia el carrito.
    // 3. Vuelve a cargar los datos de bebidas y comidas actualizados.
    Cart.handleSell(cart, setCart, fetchBebidas, fetchComidas);
  };

  // Renderizado principal del componente.
  return (
    <div className="d-flex flex-column min-vh-100 App"> {/* Contenedor principal con clases de estilo. */}
      <Router> {/* Envoltorio del Router para manejar las rutas de la aplicación. */}
        {/* Renderiza el Header y pasa las propiedades necesarias */}
        <Header cartItems={cart} handleSell={handleSell} /> 
        <div className='container'> {/* Contenedor central para el contenido principal */}
          {/* Condicional para mostrar el estado de carga o error, y renderizar el contenido principal */}
          {loading ? (
            // Si está cargando, muestra un spinner y un mensaje de "Cargando..."
            <div className="loading-spinner">
              <p>Cargando...</p>
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Cargando...</span>
              </div>
            </div>
          ) : error ? (
            // Si hay un error, muestra un mensaje de alerta con el contenido del error.
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          ) : (
            // Si no hay errores ni carga, renderiza el componente de rutas con las propiedades adecuadas.
            <RoutesComponent
              bebidas={bebidas} // Pasa la lista de bebidas.
              comidas={comidas} // Pasa la lista de comidas.
              addToCartBebida={(bebida) => Cart.addToCartBebida(bebida, cart, setCart)} // Función para agregar bebida al carrito.
              addToCartComida={(comida) => Cart.addToCartComida(comida, cart, setCart)} // Función para agregar comida al carrito.
            />
          )}
        </div>
      </Router>
      {/* Renderiza el pie de página */}
      <Footer /> 
    </div>
  );
}

export default App;
