import React from "react";
const MaquinaDeCafeHTML  = (props) => {
    
    // Se extraen las variables pasadas por parametro
	const {
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
	} = props;

    //Se devuelve el componente
    return (
        <div className="container text-center mt-4">
        <h1>Máquina de Café</h1>
        <div style={{ border: '2px solid #ccc', padding: '20px', borderRadius: '10px', width: '700px', margin: 'auto' }}>
            <h2>Opciones:</h2>
            <div className="row justify-content-center">
            {cafes.map((cafe, index) => (
                <div key={index} className="col-md-3 mb-6">
                <CafeItem {...cafe} />
                </div>
            ))}
            </div>
        </div>
        <div style={{ border: '2px solid #ccc', padding: '20px', borderRadius: '10px', width: '700px', margin: 'auto' }}>
            <h2>Comprar café:</h2>
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
        </div>
        <div style={{ border: '2px solid #ccc', padding: '20px', borderRadius: '10px', width: '700px', margin: 'auto' }}>
            <div className="text-center">
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
        <div className="justify-content-center">
            {vuelto.monto > 0 && (
            <div style={{ border: '2px solid #ccc', padding: '20px', borderRadius: '10px', width: '700px', margin: 'auto' }}>
                <div className="row justify-content-center mt-4">
                <div className="col-md-6">
                    <p>Su vuelto es de {vuelto.monto} colones.</p>
                    <p>Desglose:</p>
                    {vuelto.desglose.map((moneda, index) => (
                    <p key={index}>
                        {moneda.cantidad} moneda(s) de {moneda.valor} colones
                    </p>
                    ))}
                </div>
                </div>
            </div>
            )}
        </div>
        </div>
    );
}

export default MaquinaDeCafeHTML;