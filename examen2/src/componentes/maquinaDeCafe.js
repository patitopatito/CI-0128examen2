import React, { useState } from 'react';
import CoffeeItem from './cafeItem';
import 'bootstrap/dist/css/bootstrap.min.css';

const MaquinaDeCafe = () => {

  //Se crean las variables a utilizar y sus setters.
  const [tipoCafeSeleccionado, setTipoCafeSeleccionado] = useState('');
  const [cantidadSeleccionada, setCantidadSeleccionada] = useState(0);
  const [dineroIngresado, setDineroIngresado] = useState(0);
  const [cafes, setCafes] = useState([
    { tipo: 'Americano', cantidad: 10, precio: 850 },
    { tipo: 'Capuchino', cantidad: 8, precio: 950 },
    { tipo: 'Latte', cantidad: 10, precio: 1150 },
    { tipo: 'Mocachino', cantidad: 15, precio: 1300 },
  ]);
  const cantidadesIniciales = {
    1000: 20,
    500: 20,
    100: 30,
    50: 50,
    25: 25,
  };
  const [cantidadMonedas, setCantidadMonedas] = useState({ ...cantidadesIniciales });
  
  //Funcion que maneja la compra del cafe
  const realizarCompra = () => {
    const indiceCafeSeleccionado = cafes.findIndex((cafe) => cafe.tipo === tipoCafeSeleccionado);
  
    if (indiceCafeSeleccionado !== -1) {
      const cafeSeleccionado = cafes[indiceCafeSeleccionado];
      const costoTotal = cantidadSeleccionada * cafeSeleccionado.precio;
  
      if (dineroIngresado >= costoTotal) {
        if (cafeSeleccionado.cantidad > 0 && cantidadSeleccionada <= cafeSeleccionado.cantidad) {
          const cafesActualizados = [...cafes];
          cafesActualizados[indiceCafeSeleccionado].cantidad -= cantidadSeleccionada;
          setCafes(cafesActualizados);
          setDineroIngresado(0);
          setTipoCafeSeleccionado('');
          setCantidadSeleccionada(0);
        } else {
          alert('Cantidad de café insuficiente');
        }
      } else {
        alert('Dinero insuficiente');
      }
    }
  };

  //Funcion que maneja la adicion de dinero
  const agregarDinero = (denominacion) => {
    const dineroActualizado = { ...cantidadMonedas };
    dineroActualizado[denominacion]++;
    setCantidadMonedas(dineroActualizado);
    setDineroIngresado(dineroIngresado + parseInt(denominacion));
  };

  const calcularCostoTotal = () => {
    const indiceCafeSeleccionado = cafes.findIndex((cafe) => cafe.tipo === tipoCafeSeleccionado);

    if (indiceCafeSeleccionado !== -1) {
      const cafeSeleccionado = cafes[indiceCafeSeleccionado];
      return cantidadSeleccionada * cafeSeleccionado.precio;
    }

    return 0;
  };
  //Se devuelve el componente
  return (
    <div className="container text-center mt-4">
      <h1>Máquina de Café</h1>

      <div className="row justify-content-center">
        {cafes.map((cafe, index) => (
          <div key={index} className="col-md-6 mb-4">
            <CoffeeItem {...cafe} />
          </div>
        ))}
      </div>

      <div className="row justify-content-center mt-4">
        <div className="col-md-6">
          <select
            className="form-control"
            value={tipoCafeSeleccionado}
            onChange={(e) => setTipoCafeSeleccionado(e.target.value)}
          >
            <option value="">Seleccione el tipo de café...</option>
            {cafes.map((cafe, index) => (
              <option key={index} value={cafe.tipo}>
                {cafe.tipo}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="row justify-content-center mt-2">
        <div className="col-md-6">
          <label>Cantidad:</label>
          <input
            type="number"
            className="form-control"
            value={tipoCafeSeleccionado === '' ? 0 : cantidadSeleccionada}
            onChange={(e) => setCantidadSeleccionada(parseInt(e.target.value))}
          />
        </div>
      </div>

      <div className="row justify-content-center mt-2">
        <div className="col-md-6">
          <p>Total: {calcularCostoTotal()} colones</p>
        </div>
      </div>

      <div className="row justify-content-center mt-2">
        <div className="col-md-6">
          <button className="btn btn-primary btn-block" onClick={realizarCompra}>
            Comprar
          </button>
        </div>
      </div>

      <div className="row justify-content-center mt-4">
        <div className="col-md-6">
          <h2>Agregar Dinero</h2>
          <p>Dinero agregado: {dineroIngresado} colones</p>
          <div className="btn-group">
            <button className="btn btn-secondary" onClick={() => agregarDinero('1000')}>
              ₡1000
            </button>
            <button className="btn btn-secondary" onClick={() => agregarDinero('500')}>
              ₡500
            </button>
            <button className="btn btn-secondary" onClick={() => agregarDinero('100')}>
              ₡100
            </button>
            <button className="btn btn-secondary" onClick={() => agregarDinero('50')}>
              ₡50
            </button>
            <button className="btn btn-secondary" onClick={() => agregarDinero('2')}>
              ₡25
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaquinaDeCafe;