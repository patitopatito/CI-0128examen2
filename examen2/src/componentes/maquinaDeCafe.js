import React, { useState } from 'react';
import CafeItem from './cafeItem';
import 'bootstrap/dist/css/bootstrap.min.css';

const MaquinaDeCafe = () => {

  //Se crean las variables a utilizar y sus setters.
  const [cafeSeleccionado, setCafeSeleccionado] = useState('');
  const [cafes, setCafes] = useState([
    { tipo: 'Americano', cantidad: 10, precio: 850 },
    { tipo: 'Capuchino', cantidad: 8, precio: 950 },
    { tipo: 'Latte', cantidad: 10, precio: 1150 },
    { tipo: 'Mocachino', cantidad: 15, precio: 1300 },
  ]);

  //Funcion que maneja la compra del cafe
  const realizarCompra = () => {
    const indiceCafeSeleccionado = cafes.findIndex((cafe) => cafe.tipo === cafeSeleccionado);
    if (indiceCafeSeleccionado !== -1 && cafes[indiceCafeSeleccionado].cantidad > 0) {
      const cafesActualizados = [...cafes];
      cafesActualizados[indiceCafeSeleccionado].cantidad--;
      setCafes(cafesActualizados);
    }
  };

  //Se devuelve el componente
  return (
    <div className="container text-center mt-4">
      <h1>Máquina de Café</h1>

      <div className="row justify-content-center">
        {cafes.map((cafe, index) => (
          <div key={index} className="col-md-6 mb-4">
            <CafeItem {...cafe} />
          </div>
        ))}
      </div>

      <div className="row justify-content-center mt-4">
        <div className="col-md-6">
          <select className="form-control" onChange={(e) => setCafeSeleccionado(e.target.value)}>
            <option value="">Selecciona el tipo de café...</option>
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
          <button className="btn btn-primary btn-block" onClick={realizarCompra}>
            Comprar
          </button>
        </div>
      </div>
    </div>
  );
};

export default MaquinaDeCafe;