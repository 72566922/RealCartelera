// ParentComponent.test.js
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ParentComponent from "./ParentComponent";

// Mock del componente ChildComponent
jest.mock("./ChildComponent", () => ({ onIncrement }) => (
  <button onClick={() => onIncrement(1)}>
    Simular incremento en el padre
  </button>
));

describe("ParentComponent", () => {
  test("handleIncrement incrementa correctamente el número en el padre", () => {
    render(<ParentComponent />);

    // Verifica que el número inicial en el padre sea 0
    expect(screen.getByText(/Número en el padre: 0/i)).toBeInTheDocument();

    // Simula el clic en el botón del hijo
    const button = screen.getByText(/Simular incremento en el padre/i);
    fireEvent.click(button);

    // Verifica que el número en el padre se haya incrementado a 1
    expect(screen.getByText(/Número en el padre: 1/i)).toBeInTheDocument();

    // Simula otro clic en el botón del hijo
    fireEvent.click(button);

    // Verifica que el número en el padre se haya incrementado a 2
    expect(screen.getByText(/Número en el padre: 2/i)).toBeInTheDocument();
  });
});
