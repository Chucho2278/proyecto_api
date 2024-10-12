import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

// Define la interfaz para los funcionarios
interface Funcionario {
  idfuncionarios: number;
  nombre: string;
  cargo: string;
  correo: string;
  usuario: string;
  contraseña: string;
}

const FuncionariosPage: React.FC = () => {
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const [nombre, setNombre] = useState("");
  const [cargo, setCargo] = useState("");
  const [correo, setCorreo] = useState("");
  const [usuario, setUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [idfuncionarios, setIdfuncionarios] = useState<number | null>(null);

  // Obtener todos los funcionarios al cargar la página
  useEffect(() => {
    fetchFuncionarios();
  }, []);

  const fetchFuncionarios = async () => {
    try {
      const response = await axios.get<Funcionario[]>(
        "http://localhost:3001/api/funcionarios"
      );
      setFuncionarios(response.data);
    } catch (error) {
      console.error("Error al obtener funcionarios:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const funcionarioData = { nombre, cargo, correo, usuario, contraseña };

    try {
      if (idfuncionarios) {
        // Actualizar funcionario
        await axios.put(
          `http://localhost:3001/api/funcionarios/${idfuncionarios}`,
          funcionarioData
        );
        alert("Funcionario actualizado con éxito");
      } else {
        // Crear nuevo funcionario
        await axios.post(
          "http://localhost:3001/api/funcionarios",
          funcionarioData
        );
        alert("Funcionario registrado con éxito");
      }
      fetchFuncionarios();
      resetForm();
    } catch (error) {
      console.error("Error al registrar/actualizar funcionario:", error);
    }
  };

  const handleEdit = (funcionario: Funcionario) => {
    setIdfuncionarios(funcionario.idfuncionarios);
    setNombre(funcionario.nombre);
    setCargo(funcionario.cargo);
    setCorreo(funcionario.correo);
    setUsuario(funcionario.usuario);
    setContraseña(funcionario.contraseña);
  };

  const handleDelete = async (id: number) => {
    if (
      window.confirm("¿Estás seguro de que deseas eliminar este funcionario?")
    ) {
      try {
        await axios.delete(`http://localhost:3001/api/funcionarios/${id}`);
        alert("Funcionario eliminado con éxito");
        fetchFuncionarios();
      } catch (error) {
        console.error("Error al eliminar funcionario:", error);
      }
    }
  };

  const resetForm = () => {
    setIdfuncionarios(null);
    setNombre("");
    setCargo("");
    setCorreo("");
    setUsuario("");
    setContraseña("");
  };

  return (
    <div className="container mt-5">
      <h2>Gestión de Funcionarios</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Cargo</label>
          <input
            type="text"
            className="form-control"
            value={cargo}
            onChange={(e) => setCargo(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Correo</label>
          <input
            type="email"
            className="form-control"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Usuario</label>
          <input
            type="text"
            className="form-control"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input
            type="password"
            className="form-control"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {idfuncionarios ? "Actualizar" : "Registrar"}
        </button>
        <button type="button" className="btn btn-secondary" onClick={resetForm}>
          Cancelar
        </button>
      </form>

      <h3 className="mt-4">Lista de Funcionarios</h3>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Cargo</th>
            <th>Correo</th>
            <th>Usuario</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {funcionarios.map((funcionario) => (
            <tr key={funcionario.idfuncionarios}>
              <td>{funcionario.idfuncionarios}</td>
              <td>{funcionario.nombre}</td>
              <td>{funcionario.cargo}</td>
              <td>{funcionario.correo}</td>
              <td>{funcionario.usuario}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm"
                  onClick={() => handleEdit(funcionario)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(funcionario.idfuncionarios)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FuncionariosPage;
