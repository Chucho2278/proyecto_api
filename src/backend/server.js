import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mysql from "mysql2";

// Configuración de Express
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173", // Asegúrate de que este sea el origen del frontend
  })
);
app.use(bodyParser.json());

// Configuración de conexión a MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root", // Cambia esto por tu usuario de MySQL
  password: "Root123", // Cambia esto por tu contraseña de MySQL
  database: "proyecto_api", // Nombre de la base de datos
});

// Conectar a la base de datos
db.connect((err) => {
  if (err) {
    console.error("Error al conectar a la base de datos:", err);
  } else {
    console.log("Conectado a la base de datos MySQL");
  }
});

// Ruta para registrar usuarios
app.post("/api/register", (req, res) => {
  const { nombre, telefono, correo, usuario, contraseña } = req.body;
  const query =
    "INSERT INTO usuarios (nombre, telefono, correo, usuario, contraseña) VALUES (?, ?, ?, ?, ?)";

  db.query(
    query,
    [nombre, telefono, correo, usuario, contraseña],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Error al registrar el usuario" });
      }
      // Usar el 'result' para devolver el ID del usuario recién creado
      res.status(201).json({
        message: "Usuario registrado con éxito",
        userId: result.insertId,
      });
    }
  );
});
// Ruta para logear usuarios
app.post("/api/login", (req, res) => {
  const { usuario, contraseña } = req.body;

  const query = "SELECT * FROM usuarios WHERE usuario = ? AND contraseña = ?";

  db.query(query, [usuario, contraseña], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Error en el servidor" });
    }
    if (results.length > 0) {
      // Usuario encontrado, login exitoso
      res.status(200).json({ message: "Login exitoso" });
    } else {
      // Usuario o contraseña incorrectos
      res.status(401).json({ error: "Usuario o contraseña incorrectos" });
    }
  });
});

// Iniciar el servidor
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
