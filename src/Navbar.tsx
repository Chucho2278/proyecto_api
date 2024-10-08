// src/Navbar.tsx
import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container-fluid">
        {/* Botón para navegar al login de funcionarios */}
        <button
          onClick={() => navigate("/funcionarios-login")}
          className="btn btn-warning"
        >
          Funcionarios
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
