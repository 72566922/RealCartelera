import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Header from './componentes/headerComponent/header';
import Footer from './componentes/footer';
import RoutesComponent from './componentes/headerComponent/Route';
import ApiService from './services/ApiService';
import Cart from './Cart';

function App() {
  const [bebidas, setBebidas] = useState([]);
  const [comidas, setComidas] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBebidas();
    fetchComidas();
  }, []);

  const fetchBebidas = async () => {
    try {
      const response = await ApiService.getAllBebidas();
      setBebidas(response.data);
    } catch (error) {
      setError('Error al obtener las bebidas');
      console.error(error);
    }
  };

  const fetchComidas = async () => {
    try {
      const response = await ApiService.getAllComidas();
      setComidas(response.data);
    } catch (error) {
      setError('Error al obtener las comidas');
      console.error(error);
    } finally {
      setLoading(false); // Cambiar a false después de intentar cargar
    }
  };

  const handleSell = () => {
    Cart.handleSell(cart, setCart, fetchBebidas, fetchComidas);
  };

  return (
    <div className="d-flex flex-column min-vh-100 App">
      <Router>
        <Header cartItems={cart} handleSell={handleSell} />
        <div className='container'>
          {loading ? (
            <div className="loading-spinner">
              <p>Cargando...</p>
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Cargando...</span>
              </div>
            </div>
          ) : error ? (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          ) : (
            <RoutesComponent
              bebidas={bebidas}
              comidas={comidas}
              addToCartBebida={(bebida) => Cart.addToCartBebida(bebida, cart, setCart)}
              addToCartComida={(comida) => Cart.addToCartComida(comida, cart, setCart)}
            />
          )}
        </div>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
