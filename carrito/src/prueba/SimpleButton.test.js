import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SimpleButton from './SimpleButton'; // Asegúrate de que la ruta sea correcta

describe('SimpleButton Component', () => {
  test('renders button and shows text after click', () => {
    render(<SimpleButton />);

    // Verifica si el botón está en el documento
    const button = screen.getByText(/Haz clic aquí/i);
    expect(button).toBeInTheDocument();

    // Simula un clic en el botón
    fireEvent.click(button);

    // Verifica si el texto cambia después del clic
    expect(screen.getByText(/¡Botón clickeado!/i)).toBeInTheDocument();
  });
});
