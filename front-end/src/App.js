import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Header from './componentes/headerComponent/header';
import Footer from './componentes/footer';
import RoutesComponent from './componentes/headerComponent/Route';
import BebidaService from './services/BebidaService';
import ComidaService from './services/ComidaService'; // Asegúrate de que este archivo existe

function App() {
  // Estado para almacenar las bebidas, comidas y el carrito
  const [bebidas, setBebidas] = useState([]);
  const [comidas, setComidas] = useState([]); // Estado para las comidas
  const [cart, setCart] = useState([]);

  // Efecto que se ejecuta al montar el componente
  useEffect(() => {
    console.log("Component App montado, llamando a fetchBebidas y fetchComidas");
    fetchBebidas(); // Llama a la función para obtener las bebidas
    fetchComidas(); // Obtener las comidas al cargar el componente
  }, []); // Dependencias vacías para ejecutar solo al montar

  // Función para obtener todas las bebidas
  const fetchBebidas = () => {
    console.log("Llamando a BebidaService para obtener las bebidas...");
    BebidaService.getAllBebidas()
      .then(response => {
        console.log("Bebidas obtenidas:", response.data);
        setBebidas(response.data); // Actualiza el estado con las bebidas obtenidas
      })
      .catch(error => console.error('Error al obtener las bebidas', error)); // Manejo de errores
  };

  // Función para obtener todas las comidas
  const fetchComidas = () => {
    console.log("Llamando a ComidaService para obtener las comidas...");
    ComidaService.getAllComidas() // Asume que `ComidaService` tiene un método para obtener comidas
      .then(response => {
        console.log("Comidas obtenidas:", response.data);
        setComidas(response.data); // Actualiza el estado con las comidas obtenidas
      })
      .catch(error => console.error('Error al obtener las comidas', error)); // Manejo de errores
  };

  // Función para añadir una bebida al carrito
  const addToCartBebida = (bebida) => {
    const existingItemIndex = cart.findIndex(cartItem => 
      cartItem.id_bebida === bebida.id_bebida // Verifica por id_bebida
    );

    if (existingItemIndex >= 0) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].cantidadSeleccionada += bebida.cantidadSeleccionada;
      updatedCart[existingItemIndex].precioTotal += bebida.precioTotal;
      setCart(updatedCart);
    } else {
      setCart([...cart, bebida]);
      console.log("Nueva bebida agregada al carrito:", bebida);
    }
  };

  // Función para añadir una comida al carrito
  const addToCartComida = (comida) => {
    const existingItemIndex = cart.findIndex(cartItem => 
      cartItem.id_comida === comida.id_comida // Verifica por id_comida
    );

    if (existingItemIndex >= 0) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].cantidadSeleccionada += comida.cantidadSeleccionada;
      updatedCart[existingItemIndex].precioTotal += comida.precioTotal;
      setCart(updatedCart);
    } else {
      setCart([...cart, comida]);
      console.log("Nueva comida agregada al carrito:", comida);
    }
  };

  // Función para procesar la venta
  const handleSell = () => {
    console.log("Procesando venta...");
    
    const ventasBebidas = cart
      .filter(item => item.id_bebida) // Filtrar solo bebidas
      .map(item => ({
        id: item.id_bebida,
        cantidadVendida: item.cantidadSeleccionada // Prepara el objeto para la venta
      }));
    console.log("Ventas de bebidas:", ventasBebidas);

    const ventasComidas = cart
      .filter(item => item.id_comida) // Filtrar solo comidas
      .map(item => ({
        id: item.id_comida,
        cantidadVendida: item.cantidadSeleccionada // Prepara el objeto para la venta
      }));
    console.log("Ventas de comidas:", ventasComidas);

    // Procesa la venta de bebidas
    BebidaService.venderBebidas(ventasBebidas)
      .then(() => {
        console.log("Bebidas vendidas correctamente");
        return ComidaService.venderComidas(ventasComidas); // Asume que tienes este método en `ComidaService`
      })
      .then(() => {
        console.log("Comidas vendidas correctamente");
        setCart([]); // Vacía el carrito después de la venta
        console.log("Carrito vaciado después de la venta");
        fetchBebidas(); // Refrescar la lista de bebidas después de la venta
        fetchComidas(); // Refrescar la lista de comidas
      })
      .catch(error => {
        console.error("Error al realizar la venta:", error); // Manejo de errores
      });
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Router>
        <Header cartItems={cart} handleSell={handleSell} /> {/* Pasa el carrito y la función de venta al Header */}
        <div className='container'>
          <RoutesComponent 
            bebidas={bebidas} 
            comidas={comidas} 
            addToCartBebida={addToCartBebida} 
            addToCartComida={addToCartComida} 
          /> {/* Rutas y componentes */}
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
