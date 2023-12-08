import React from 'react';

//Se crea un elemento que contiene la informacion de cada cafe
const CafeItem = ({ tipo, cantidad, precio }) => (
  <div>
    <h3>{tipo}</h3>
    <p>Cantidad: {cantidad}</p>
    <p>Precio: {precio} colones</p>
  </div>
);

export default CafeItem;