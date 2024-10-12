import { useNavigate } from "react-router-dom";
import "./Menu.css"; // Para estilos adicionales

const Menu = () => {
  const navigate = useNavigate();

  // Definición de la interfaz Producto
  interface Producto {
    nombre: string;
    descripcion: string;
    precio: number;
    imagen: string;
  }

  // Función para manejar la selección de un producto
  const seleccionarProducto = (producto: Producto) => {
    console.log("Producto seleccionado:", producto);
    navigate("/confirmacion-compra", { state: { producto } });
  };

  // Lista de productos
  const productos: Producto[] = [
    {
      nombre: "Hamburguesa Clásica",
      descripcion: "Deliciosa hamburguesa clásica con todos los ingredientes.",
      precio: 17000,
      imagen: "/images/burguer_1.jpg",
    },
    {
      nombre: "Hamburguesa Premium",
      descripcion: "Hamburguesa premium con ingredientes seleccionados.",
      precio: 24000,
      imagen: "/images/hamburguesa_premium.png",
    },
    {
      nombre: "Perro Caliente Clásico",
      descripcion: "El clásico perro caliente con salsa y papitas.",
      precio: 14900,
      imagen: "/images/perro_caliente_clasico.png",
    },
    {
      nombre: "Perro Caliente Premium",
      descripcion: "Perro caliente premium con ingredientes gourmet.",
      precio: 17900,
      imagen: "/images/perro_caliente_premium.png",
    },
  ];

  // Renderizado de los productos en formato de tarjeta
  return (
    <div className="container mt-5">
      <h2>Menú</h2>
      <div className="row">
        {productos.map((producto, index) => (
          <div className="col-md-6" key={index}>
            <div
              className="card"
              onClick={() => seleccionarProducto(producto)}
              style={{ cursor: "pointer" }} // Estilo para indicar que es clicable
            >
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
