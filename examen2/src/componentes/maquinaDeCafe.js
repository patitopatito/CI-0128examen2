import React, { useState, useEffect } from 'react';
import CafeItem from './cafeItem';
import  MaquinaDeCafeHTML  from './maquinaDeCafeHTML';
import 'bootstrap/dist/css/bootstrap.min.css';

const MaquinaDeCafe = () => {

  //Se crean las variables a utilizar y sus setters.
  const [tipoCafeSeleccionado, setTipoCafeSeleccionado] = useState('');
  const [cantidadSeleccionada, setCantidadSeleccionada] = useState(0);
  const [dineroIngresado, setDineroIngresado] = useState(0);
  const [vuelto, setVuelto] = useState({ monto: 0, desglose: [] });
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

 // Funcion que verifica si hay monedas para todas las denominaciones
  const verificarMonedasAgotadas = () => {
    const denominaciones = Object.keys(cantidadMonedas);

    for (const denominacion of denominaciones) {
      if (cantidadMonedas[denominacion] === 0) {
        alert(`¡Aviso! La máquina está fuera de servicio. Denominación ${denominacion} agotada.`);
      }
    }
  };

  //Se establece que la verificacion se haga cada 5 segundos
  useEffect(() => {
    const intervalId = setInterval(() => {
      verificarMonedasAgotadas();
    }, 5000); 

    return () => clearInterval(intervalId);
  });

  // Funcion que maneja la compra del cafe
  const realizarCompra = () => {
    // Busca el cafe seleccionado
    const indiceCafeSeleccionado = cafes.findIndex((cafe) => cafe.tipo === tipoCafeSeleccionado);
    
    //Verifica que sea un cafe válido
    if (indiceCafeSeleccionado !== -1) {
      const cafeSeleccionado = cafes[indiceCafeSeleccionado];
      const costoTotal = cantidadSeleccionada * cafeSeleccionado.precio;

      //Verifica que haya suficiente dinero
      if (dineroIngresado >= costoTotal) {

        //Verifica que haya suficiente cafe disponible
        if (cafeSeleccionado.cantidad > 0 && cantidadSeleccionada <= cafeSeleccionado.cantidad) {
          const vuelto = dineroIngresado - costoTotal;
          
          //Verifica que haya suficientes monedas para dar el vuelto
          if (verificarMonedasSuficientes(vuelto)){
            // Calcula la cantidad de monedas de cada denominación
            let desgloseMonedas = calcularVuelto(vuelto);
    
            setVuelto({ monto: vuelto, desglose: desgloseMonedas });
    
            // Restablece los estados de los selectores
            const cafesActualizados = [...cafes];
            cafesActualizados[indiceCafeSeleccionado].cantidad -= cantidadSeleccionada;
            setCafes(cafesActualizados);
            setDineroIngresado(0);
            setTipoCafeSeleccionado('');
            setCantidadSeleccionada(1);
          }else{
            alert('Fallo al realizar la compra');
          }
        } else {
          alert('Cantidad de café insuficiente');
        }
      } else {
        alert('Dinero insuficiente');
      }
    }
  };

  // Funcion para calcular el desglose
  const calcularVuelto = (vuelto) =>{
    const desgloseMonedas = [];
    let cantidadActual = vuelto;

    // Monedas de 500
    const monedas500 = Math.floor(cantidadActual / 500);
    if (monedas500 > 0) {
      desgloseMonedas.push({ valor: 500, cantidad: monedas500 });
      cantidadActual -= monedas500 * 500;
      const nuevaCantidadMonedas = { ...cantidadMonedas };
      nuevaCantidadMonedas[500] -= monedas500;
      setCantidadMonedas(nuevaCantidadMonedas);
    }

    // Monedas de 100
    const monedas100 = Math.floor(cantidadActual / 100);
    if (monedas100 > 0) {
      desgloseMonedas.push({ valor: 100, cantidad: monedas100 });
      cantidadActual -= monedas100 * 100;
      const nuevaCantidadMonedas = { ...cantidadMonedas };
      nuevaCantidadMonedas[100] -= monedas100;
      setCantidadMonedas(nuevaCantidadMonedas);
    }

    // Monedas de 50
    const monedas50 = Math.floor(cantidadActual / 50);
    if (monedas50 > 0) {
      desgloseMonedas.push({ valor: 50, cantidad: monedas50 });
      cantidadActual -= monedas50 * 50;
      const nuevaCantidadMonedas = { ...cantidadMonedas };
      nuevaCantidadMonedas[50] -= monedas50;
      setCantidadMonedas(nuevaCantidadMonedas);
    }

    // Monedas de 25
    const monedas25 = Math.floor(cantidadActual / 25);
    if (monedas25 > 0) {
      desgloseMonedas.push({ valor: 25, cantidad: monedas25 });
      cantidadActual -= monedas25 * 25;
      const nuevaCantidadMonedas = { ...cantidadMonedas };
      nuevaCantidadMonedas[25] -= monedas25;
      setCantidadMonedas(nuevaCantidadMonedas);
    }

    return desgloseMonedas;
  };

  // Funcion que verifica si hay suficientes monedas disponibles para dar el vuelto
  const verificarMonedasSuficientes = (vuelto) => {
    const monedasDisponibles = { ...cantidadMonedas };
    let cantidadActual = vuelto;

    const monedas500 = Math.floor(cantidadActual / 500);
    if (monedas500 > monedasDisponibles[500]) {
      return false;
    }
    cantidadActual -= monedas500 * 500;

    const monedas100 = Math.floor(cantidadActual / 100);
    if (monedas100 > monedasDisponibles[100]) {
      return false;
    }
    cantidadActual -= monedas100 * 100;

    const monedas50 = Math.floor(cantidadActual / 50);
    if (monedas50 > monedasDisponibles[50]) {
      return false;
    }
    cantidadActual -= monedas50* 50;
  
    const monedas25 = Math.floor(cantidadActual / 25);
    if (monedas25 > monedasDisponibles[25]) {
      return false;
    }
  
    return true;
  };

  // Funcion para agregar dinero
  const agregarDinero = (denominacion) => {
    const dineroActualizado = { ...cantidadMonedas };
    dineroActualizado[denominacion]++;
    setCantidadMonedas(dineroActualizado);
    setDineroIngresado(dineroIngresado + parseInt(denominacion));
  };

  // Funcion para calcular el costo de la orden 
  const calcularCostoTotal = () => {
    const indiceCafeSeleccionado = cafes.findIndex((cafe) => cafe.tipo === tipoCafeSeleccionado);
    if (indiceCafeSeleccionado !== -1) {
      const cafeSeleccionado = cafes[indiceCafeSeleccionado];
      return cantidadSeleccionada * cafeSeleccionado.precio;
    }
    return 0;
  };

  //Variables y funcionnes necesarias para el componente 
	const props = {
    cafes,
    CafeItem,
    tipoCafeSeleccionado,
    setTipoCafeSeleccionado,                    
    cantidadSeleccionada,
    setCantidadSeleccionada,
    calcularCostoTotal,       
    realizarCompra,           
    dineroIngresado,          
    agregarDinero,            
    vuelto                   
	};

  // Se devuelve el componente
  return (
            <>
              <MaquinaDeCafeHTML {...props}/>
            </>
  );
};

export default MaquinaDeCafe;