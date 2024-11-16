import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ParentComponent from "./ParentComponent";
import ChildComponent from "./ChildComponent";

jest.mock("./ChildComponent", () => ({ onAction }) => {
  return (
    <button onClick={() => onAction("¡Este es un mensaje único desde el hijo!")}>
      Simular acción única del hijo
    </button>
  );
});

describe("ParentComponent", () => {
  test("handleChildAction actualiza el mensaje personalizado correctamente", () => {
    render(<ParentComponent />);

    // Verifica el estado inicial
    expect(screen.getByText(/Mensaje del hijo:/i)).toBeInTheDocument();

    // Simula el clic en el botón del hijo
    const button = screen.getByText(/Simular acción única del hijo/i);
    fireEvent.click(button);

    // Verifica que el mensaje en el padre cambió con el texto personalizado
    expect(
      screen.getByText(
        /Mensaje del hijo: Mensaje personalizado del hijo: ¡Este es un mensaje único desde el hijo!/i
      )
    ).toBeInTheDocument();
  });
});
