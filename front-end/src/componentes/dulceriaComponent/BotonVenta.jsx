import React from 'react';

function BotonVenta({ manejarVenta, disabled }) {
  return (
    <div className='container'>
      <button className="btn btn-primary" onClick={manejarVenta} disabled={disabled}>
        Agregar al carrito
      </button>
    </div>
  );
}

export default BotonVenta;
