import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SumarNumeros from './SumarNumeros'; // Asegúrate de usar la ruta correcta

describe('Componente SumarNumeros', () => {
  test('suma correctamente dos números', () => {
    render(<SumarNumeros />);

    // Obtén los elementos del formulario
    const input1 = screen.getByPlaceholderText('Número 1');
    const input2 = screen.getByPlaceholderText('Número 2');
    const button = screen.getByText('Sumar');

    // Simula la entrada de números
    fireEvent.change(input1, { target: { value: '3' } });
    fireEvent.change(input2, { target: { value: '4' } });

    // Simula el clic en el botón "Sumar"
    fireEvent.click(button);

    // Verifica que el resultado sea correcto
    expect(screen.getByText('Resultado: 7')).toBeInTheDocument();
  });

 
});
