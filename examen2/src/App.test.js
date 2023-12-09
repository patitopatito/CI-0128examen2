import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MaquinaDeCafe from './componentes/maquinaDeCafe';

describe('MaquinaDeCafe Component', () => {

  //Prueba que se renderice bien el componente buscando el titulo (US #1).
  test('Renderizar el componente', () => {
    render(<MaquinaDeCafe />);
    expect(screen.getByText('Máquina de Café')).toBeInTheDocument();
  });

  //Prueba que se pueda cambiar el tipo de cafe y la cantidad (US #2).
  test('Seleccionar cafe y cantidad', () => {
    render(<MaquinaDeCafe />);

    //Arrange: Se localizan los elementos de seleccion de cafe y cantidad.
    const selectorCafe = screen.getByDisplayValue('Seleccione el tipo de café...'); // Ajusta el valor inicial aquí
    const cantidad = screen.getByDisplayValue('0');

    //Act: Se cambian los valores de dichos selectores.
    fireEvent.change(selectorCafe, { target: { value: 'Americano' } });
    fireEvent.change(cantidad, { target: { value: '2' } });

    //Assert: Se verifica que los valores si hayan cambiado correctamente.
    expect(selectorCafe.value).toBe('Americano');
    expect(cantidad.value).toBe('2');
  });

  //Prueba que se pueda agregar dinero correctamente (US #3).
  test('Agregar dinero con los botones', () => {
    render(<MaquinaDeCafe />);

    //Arrange: Se localiza el indicador de dinero agregado.
    const dineroAgregado = screen.getByText('Dinero agregado: 0 colones');

    //Assert: Se verifica el valor inicial sea 0.
    expect(dineroAgregado).toBeInTheDocument();
  
    //Arrange: Se localizan los botones para agregar dinero.
    const Boton1000 = screen.getByText('₡1000');
    const Boton500 = screen.getByText('₡500');
    const Boton100 = screen.getByText('₡100');
    const Boton50 = screen.getByText('₡50');
    const Boton25 = screen.getByText('₡25');

    //Act: Se hace click a cada uno.
    fireEvent.click(Boton1000);
    fireEvent.click(Boton500);
    fireEvent.click(Boton100);
    fireEvent.click(Boton50);
    fireEvent.click(Boton25);

    //Assert: Se verifica el dinero agregado sea 1675.
    const nuevoDineroAgregado = screen.getByText('Dinero agregado: 1675 colones');
    expect(nuevoDineroAgregado).toBeInTheDocument();
  });

  //Prueba de una compra que falla por falta de dinero.
  test('Realizar una compra (no exitosa) sin agregar dinero', () => {
    render(<MaquinaDeCafe />);

    //Arrange: Se localizan los elementos de seleccion de cafe y cantidad y el boton de comprar.
    //Ademas de un verificador de alertas 
    const selectorCafe = screen.getByDisplayValue('Seleccione el tipo de café...'); // Ajusta el valor inicial aquí
    const cantidad = screen.getByDisplayValue('0');
    const alerta = jest.spyOn(window, 'alert').mockImplementation(() => {});
    const comprarButton = screen.getByText('Comprar');
  
    //Act: Se seleccionan los valores del cafe y cantidad y se procede a comprar.
    fireEvent.change(selectorCafe, { target: { value: 'Americano' } });
    fireEvent.change(cantidad, { target: { value: '2' } });
    fireEvent.click(comprarButton);
  
    //Assert: Se verifica que aparezca la alerta de dinero insuficiente.
    expect(alerta).toHaveBeenCalledWith('Dinero insuficiente');
  
    alerta.mockRestore();
  });

  //Prueba de una compra exitosa que revisa el vuelto.
  test('Realizar una compra exitosa', () => {
    render(<MaquinaDeCafe />);

   //Arrange: Se localizan los elementos de seleccion de cafe y cantidad, el boton de comprar y el boton de 1000.
    const selectorCafe = screen.getByDisplayValue('Seleccione el tipo de café...');
    const cantidad = screen.getByDisplayValue('0');
    const Boton1000 = screen.getByText('₡1000');
    const comprarButton = screen.getByText('Comprar');

  //Act: Se seleccionan los valores correspondientes, se agrega el dinero y se procede a la compra.
    fireEvent.change(selectorCafe, { target: { value: 'Americano' } });
    fireEvent.change(cantidad, { target: { value: '1' } });
    fireEvent.click(Boton1000);
    fireEvent.click(comprarButton);

    //Assert: Se verifica que aparezca el vuelto desglosado correctamente.

    const mensajeVuelto = screen.getByText('Su vuelto es de 150 colones.');
    expect(mensajeVuelto).toBeInTheDocument();

    const mensajeDesglose = screen.getByText(/Desglose:/);
    expect(mensajeDesglose).toBeInTheDocument();

    const monedas100Mensaje = screen.getByText('1 moneda(s) de 100 colones');
    expect(monedas100Mensaje).toBeInTheDocument();

    const monedas50Mensaje = screen.getByText('1 moneda(s) de 50 colones');
    expect(monedas50Mensaje).toBeInTheDocument();

  });

});