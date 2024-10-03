import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Header from './componentes/headerComponent/header';
import Footer from './componentes/footer';
import RoutesComponent from './componentes/headerComponent/Route';
import ApiService from './services/ApiService'; // Importamos el nuevo servicio
import Cart from './Cart'; // Importamos el nuevo componente de carrito

function App() {
  const [bebidas, setBebidas] = useState([]);
  const [comidas, setComidas] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetchBebidas();
    fetchComidas();
  }, []);

  const fetchBebidas = () => {
    ApiService.getAllBebidas()
      .then(response => {
        setBebidas(response.data);
      })
      .catch(error => console.error('Error al obtener las bebidas', error));
  };

  const fetchComidas = () => {
    ApiService.getAllComidas()
      .then(response => {
        setComidas(response.data);
      })
      .catch(error => console.error('Error al obtener las comidas', error));
  };

  const handleSell = () => {
    Cart.handleSell(cart, setCart, fetchBebidas, fetchComidas); // Pasar setCart aquí
  };
  

  return (
    <div className="d-flex flex-column min-vh-100">
      <Router>
        <Header cartItems={cart} handleSell={handleSell} />
        <div className='container'>
          <RoutesComponent
            bebidas={bebidas}
            comidas={comidas}
            addToCartBebida={(bebida) => Cart.addToCartBebida(bebida, cart, setCart)}
            addToCartComida={(comida) => Cart.addToCartComida(comida, cart, setCart)}
          />
        </div>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
