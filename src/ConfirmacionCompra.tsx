import { useLocation } from "react-router-dom";

const ConfirmacionCompra = () => {
  const location = useLocation();
  const producto = location.state?.producto; // Accedemos al producto pasado desde Menu

  if (!producto) {
    return <div>No se seleccionó ningún producto.</div>;
  }

  return (
    <div className="container mt-5">
      <h2>Confirmación de Compra</h2>
      <div className="card">
        <img
          src={producto.imagen}
          className="card-img-top"
          alt={producto.nombre}
        />
        <div className="card-body">
          <h5 className="card-title">{producto.nombre}</h5>
          <p className="card-text">{producto.descripcion}</p>
        </div>
      </div>
      <button className="btn btn-primary mt-3">Confirmar Compra</button>
    </div>
  );
};

export default ConfirmacionCompra;
