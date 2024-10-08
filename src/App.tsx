import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import "./App.css";

// Página de registro y login (combinada)
const Home = () => {
  const navigate = useNavigate();

  // Estados para el formulario de registro
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correo, setCorreo] = useState("");
  const [usuario, setUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");

  // Estados para el formulario de login
  const [loginUsuario, setLoginUsuario] = useState("");
  const [loginContraseña, setLoginContraseña] = useState("");
  const [loginError, setLoginError] = useState("");

  // Maneja el envío del formulario de registro
  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newUser = { nombre, telefono, correo, usuario, contraseña };

    try {
      const response = await fetch("http://localhost:3001/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        alert("Usuario creado con éxito, por favor ingresa en login");
        setNombre("");
        setTelefono("");
        setCorreo("");
        setUsuario("");
        setContraseña("");
      } else {
        alert("Error al registrar usuario");
      }
    } catch (error) {
      console.error("Error al registrar usuario:", error);
    }
  };

  // Maneja el envío del formulario de login
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const loginData = { usuario: loginUsuario, contraseña: loginContraseña };

    try {
      const response = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        setLoginError("");
        navigate("/menu");
      } else {
        setLoginError("Usuario o contraseña incorrectos");
      }
    } catch (error) {
      console.error("Error al intentar logear:", error);
      setLoginError("Error en el servidor");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        {/* Sección del formulario de registro */}
        <div className="col-md-6">
          <h2>Registrate</h2>
          <form onSubmit={handleRegisterSubmit}>
            <div className="mb-3">
              <label htmlFor="nombre" className="form-label">
                Nombre
              </label>
              <input
                type="text"
                className="form-control"
                id="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="telefono" className="form-label">
                Teléfono
              </label>
              <input
                type="text"
                className="form-control"
                id="telefono"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="correo" className="form-label">
                Correo
              </label>
              <input
                type="email"
                className="form-control"
                id="correo"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="usuario" className="form-label">
                Usuario
              </label>
              <input
                type="text"
                className="form-control"
                id="usuario"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="contraseña" className="form-label">
                Contraseña
              </label>
              <input
                type="password"
                className="form-control"
                id="contraseña"
                value={contraseña}
                onChange={(e) => setContraseña(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Registrar
            </button>
          </form>
        </div>

        {/* Sección del formulario de login */}
        <div className="col-md-6">
          <h2>Login</h2>
          <form onSubmit={handleLoginSubmit}>
            <div className="mb-3">
              <label htmlFor="loginUsuario" className="form-label">
                Usuario
              </label>
              <input
                type="text"
                className="form-control"
                id="loginUsuario"
                value={loginUsuario}
                onChange={(e) => setLoginUsuario(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="loginContraseña" className="form-label">
                Contraseña
              </label>
              <input
                type="password"
                className="form-control"
                id="loginContraseña"
                value={loginContraseña}
                onChange={(e) => setLoginContraseña(e.target.value)}
              />
            </div>
            {loginError && (
              <div className="alert alert-danger">{loginError}</div>
            )}
            <button type="submit" className="btn btn-success">
              Iniciar sesión
            </button>
          </form>

          {/* Imagen de la empresa */}
          <div className="company-logo mt-4 text-center">
            <img
              src="images/empresa-logo.png"
              alt="Logo de la empresa"
              className="img-fluid"
              style={{ maxWidth: "200px" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Página de menú
const Menu = () => {
  return (
    <div className="container mt-5">
      <h2>Menú</h2>
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <img
              src="images/burguer_1.jpg"
              className="card-img-top"
              alt="Hamburguesa Clásica"
            />
            <div className="card-body">
              <h5 className="card-title">Hamburguesa Clásica</h5>
              <p className="card-text">
                Deliciosa hamburguesa clásica con todos los ingredientes.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card">
            <img
              src="images/burguer_2.jpg"
              className="card-img-top"
              alt="Hamburguesa Premium"
            />
            <div className="card-body">
              <h5 className="card-title">Hamburguesa Premium</h5>
              <p className="card-text">
                Hamburguesa premium con ingredientes seleccionados.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-6 mt-4">
          <div className="card">
            <img
              src="images/perro_1.jpg"
              className="card-img-top"
              alt="Perro Caliente Clásico"
            />
            <div className="card-body">
              <h5 className="card-title">Perro Caliente Clásico</h5>
              <p className="card-text">
                El clásico perro caliente con salsa y papitas.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-6 mt-4">
          <div className="card">
            <img
              src="images/perro_2.jpg"
              className="card-img-top"
              alt="Perro Caliente Premium"
            />
            <div className="card-body">
              <h5 className="card-title">Perro Caliente Premium</h5>
              <p className="card-text">
                Perro caliente premium con ingredientes gourmet.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Página de login de funcionarios
const FuncionariosLogin = () => {
  const [funcionarioUsuario, setFuncionarioUsuario] = useState("");
  const [funcionarioContraseña, setFuncionarioContraseña] = useState("");
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  const handleFuncionariosLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const loginData = {
      usuario: funcionarioUsuario,
      contraseña: funcionarioContraseña,
    };

    try {
      const response = await fetch(
        "http://localhost:3001/api/funcionarios-login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginData),
        }
      );

      if (response.ok) {
        setLoginError("");
        // Redirigir a una página de administración si el login es exitoso
        navigate("/admin");
      } else {
        setLoginError("Usuario o contraseña incorrectos");
      }
    } catch (error) {
      console.error("Error al intentar logear:", error);
      setLoginError("Error en el servidor");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login Funcionarios</h2>
      <form onSubmit={handleFuncionariosLoginSubmit}>
        <div className="mb-3">
          <label htmlFor="funcionarioUsuario" className="form-label">
            Usuario
          </label>
          <input
            type="text"
            className="form-control"
            id="funcionarioUsuario"
            value={funcionarioUsuario}
            onChange={(e) => setFuncionarioUsuario(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="funcionarioContraseña" className="form-label">
            Contraseña
          </label>
          <input
            type="password"
            className="form-control"
            id="funcionarioContraseña"
            value={funcionarioContraseña}
            onChange={(e) => setFuncionarioContraseña(e.target.value)}
          />
        </div>
        {loginError && <div className="alert alert-danger">{loginError}</div>}
        <button type="submit" className="btn btn-primary">
          Iniciar sesión
        </button>
        <button
          onClick={() => navigate("/funcionarios-login")}
          className="btn btn-warning"
        >
          Funcionarios
        </button>
      </form>
    </div>
  );
};

// Componente principal de la aplicación
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route
          path="/funcionarios-login"
          element={<FuncionariosLogin />}
        />{" "}
        {/* Nueva ruta */}
      </Routes>
    </Router>
  );
};

export default App;
