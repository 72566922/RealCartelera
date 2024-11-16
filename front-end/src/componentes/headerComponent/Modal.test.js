import React from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import Modal from "./Modal"; // Asegúrate de usar la ruta correcta

describe("Modal Component - Carrito de Compras", () => {
  const mockHandleModalToggle = jest.fn();
  
  afterEach(() => {
    jest.clearAllMocks(); // Limpiar los mocks después de cada prueba
  });

  test("no muestra el modal cuando showModal es false", () => {
    const cartItems = [
      { dulce: { nombre: "hamburguesa" }, cantidadSeleccionada: 2, precioTotal: 10.00 },
      { dulce: { nombre: "hamburguesa" }, cantidadSeleccionada: 2, precioTotal: 10.00 }
    ];

    render(
      <Modal 
        showModal={false} 
        handleModalToggle={mockHandleModalToggle} 
        cartItems={cartItems} 
      />
    );

    // Verifica que el modal no se renderiza
    expect(screen.queryByText("Carrito de Compras")).not.toBeInTheDocument();
  });
});
