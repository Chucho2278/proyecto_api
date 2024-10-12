import React, { useState, useEffect } from "react";
import axios from "axios";

interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
}

const MenuPage: React.FC = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [nuevoProducto, setNuevoProducto] = useState<Producto>({
    id: 0, // Agrega un campo id para el nuevo producto
    nombre: "",
    descripcion: "",
    precio: 0,
  });

  // Cargar productos del menú
  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const response = await axios.get<Producto[]>("/api/menu");
        setProductos(response.data);
      } catch (error) {
        console.error("Error al cargar el menú:", error);
      }
    };

    cargarProductos();
  }, []);

  // Agregar producto
  const agregarProducto = async () => {
    try {
      const response = await axios.post<Producto>("/api/menu", nuevoProducto);
      setProductos([...productos, response.data]);
      setNuevoProducto({ id: 0, nombre: "", descripcion: "", precio: 0 }); // Reinicia el formulario
    } catch (error) {
      console.error("Error al agregar el producto:", error);
    }
  };

  // Eliminar producto
  const eliminarProducto = async (id: number) => {
    try {
      await axios.delete(`/api/menu/${id}`);
      setProductos(productos.filter((producto) => producto.id !== id));
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  };

  // Actualizar producto
  const actualizarProducto = async (id: number, actualizado: Producto) => {
    try {
      const response = await axios.put<Producto>(
        `/api/menu/${id}`,
        actualizado
      );
      setProductos(
        productos.map((producto) =>
          producto.id === id ? response.data : producto
        )
      );
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
    }
  };

  return (
    <div>
      <h2>Menú</h2>
      <div>
        <input
          type="text"
          placeholder="Nombre"
          value={nuevoProducto.nombre}
          onChange={(e) =>
            setNuevoProducto({ ...nuevoProducto, nombre: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Descripción"
          value={nuevoProducto.descripcion}
          onChange={(e) =>
            setNuevoProducto({ ...nuevoProducto, descripcion: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Precio"
          value={nuevoProducto.precio}
          onChange={(e) =>
            setNuevoProducto({
              ...nuevoProducto,
              precio: parseFloat(e.target.value),
            })
          }
        />
        <button onClick={agregarProducto}>Agregar Producto</button>
      </div>
      <ul>
        {productos.map((producto) => (
          <li key={producto.id}>
            <span>
              {producto.nombre} - {producto.descripcion} - ${producto.precio}
            </span>
            <button onClick={() => eliminarProducto(producto.id)}>
              Eliminar
            </button>
            <button onClick={() => actualizarProducto(producto.id, producto)}>
              Actualizar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuPage;
