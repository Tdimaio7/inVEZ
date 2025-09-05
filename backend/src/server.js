import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import userRoutes from "./routes/user.routes.js";  // 👈 importar rutas
import projectRoutes from "./routes/project.routes.js";


dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("API funcionando!");
});

// 👇 conectar rutas de usuario
app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`)
);
