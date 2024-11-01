
import React, { useEffect, useState } from "react";
import BebidaService from "../../service/BebidaService";
import ComidaService from "../../service/ComidaService";
import Carrusel from "./Carrusel";


function DulceCaruselComponent() {
  const [bebidas, setBebidas] = useState([]);
  const [comidas, setComidas] = useState([]);

  useEffect(() => {
    // Función para obtener las bebidas
    const fetchBebidas = async () => {
      try {
        const response = await BebidaService.getAllBebidas();
        setBebidas(response.data); // Asegúrate de que la respuesta tiene la estructura correcta
      } catch (error) {
        console.error("Error al obtener las bebidas:", error);
      }
    };

    // Función para obtener las comidas
    const fetchComidas = async () => {
      try {
        const response = await ComidaService.getAllComidas();
        setComidas(response.data); // Asegúrate de que la respuesta tiene la estructura correcta
      } catch (error) {
        console.error("Error al obtener las comidas:", error);
      }
    };

    // Llamar a ambas funciones
    fetchBebidas();
    fetchComidas();
  }, []);

  // Combinar bebidas y comidas en un solo array con claves únicas
  const items = [
    ...bebidas.map(bebida => ({ id: `bebida-${bebida.id_bebida}`, nombre: bebida.dulce.nombre })),
    ...comidas.map(comida => ({ id: `comida-${comida.id_comida}`, nombre: comida.dulce.nombre })),
  ];

  return (
    <div className="container mt-4">
      <h3 className="text-center">DULCES PROMO</h3>
      <Carrusel items={items} />
    </div>
  );
}

export default DulceCaruselComponent;
