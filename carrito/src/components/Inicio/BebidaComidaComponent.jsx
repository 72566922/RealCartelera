import React, { useEffect, useState } from "react"; // Importa React, useEffect y useState desde React.
import BebidaService from "../../service/BebidaService"; // Importa el servicio de Bebidas.
import ComidaService from "../../service/ComidaService"; // Importa el servicio de Comidas.
import Carrusel from "./Carrusel"; // Importa el componente Carrusel para mostrar los productos.

function DulceCaruselComponent() { // Define el componente DulceCaruselComponent.
  const [bebidas, setBebidas] = useState([]); // Estado para almacenar las bebidas obtenidas desde la API.
  const [comidas, setComidas] = useState([]); // Estado para almacenar las comidas obtenidas desde la API.

  useEffect(() => { // useEffect se ejecuta después de que el componente se monta.
    // Función para obtener las bebidas
    const fetchBebidas = async () => { // Define una función asincrónica para obtener las bebidas.
      try {
        const response = await BebidaService.getAllBebidas(); // Llama al servicio de Bebidas para obtener la lista.
        setBebidas(response.data); // Establece el estado de las bebidas con los datos obtenidos de la respuesta.
      } catch (error) {
        console.error("Error al obtener las bebidas:", error); // Muestra el error si ocurre algún problema al obtener las bebidas.
      }
    };

    // Función para obtener las comidas
    const fetchComidas = async () => { // Define una función asincrónica para obtener las comidas.
      try {
        const response = await ComidaService.getAllComidas(); // Llama al servicio de Comidas para obtener la lista.
        setComidas(response.data); // Establece el estado de las comidas con los datos obtenidos de la respuesta.
      } catch (error) {
        console.error("Error al obtener las comidas:", error); // Muestra el error si ocurre algún problema al obtener las comidas.
      }
    };

    // Llamar a ambas funciones al montar el componente
    fetchBebidas(); // Llama a la función para obtener las bebidas.
    fetchComidas(); // Llama a la función para obtener las comidas.
  }, []); // El arreglo vacío [] asegura que el useEffect se ejecute solo una vez cuando el componente se monta.

  // Combina las bebidas y comidas en un solo array con claves únicas para los elementos.
  const items = [
    ...bebidas.map(bebida => ({ id: `bebida-${bebida.id_bebida}`, nombre: bebida.dulce.nombre })), // Mapea las bebidas para generar un array con objetos que contienen un id único y el nombre del dulce.
    ...comidas.map(comida => ({ id: `comida-${comida.id_comida}`, nombre: comida.dulce.nombre })), // Mapea las comidas de manera similar.
  ];

  return (
    <div className="container mt-4"> 
      <h3 className="text-center">DULCES PROMO</h3>
      <Carrusel items={items} /> 
    </div>
  );
}

export default DulceCaruselComponent; // Exporta el componente para que pueda ser utilizado en otros lugares.
