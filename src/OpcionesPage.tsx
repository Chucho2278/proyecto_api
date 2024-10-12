import React from "react";
import { useNavigate } from "react-router-dom";

const OpcionesPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="opciones-container">
      <div className="menu-lateral">
        <button onClick={() => navigate("/funcionarios")}>Funcionarios</button>
        <button onClick={() => navigate("/usuarios")}>Usuarios</button>
        <button onClick={() => navigate("/menu")}>Menú</button>
      </div>
      <div className="imagen-compania">
        <img src="/ruta/a/la/imagen-de-la-compania.jpg" alt="Compañía" />
      </div>
    </div>
  );
};

export default OpcionesPage;
