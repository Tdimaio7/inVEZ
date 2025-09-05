import { Router } from "express";
import User from "../models/user.js";
import generateToken from "../utils/generateToken.js";

const router = Router();

// Registro de usuario
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    const user = new User({ name, email, password, role });
    await user.save();

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id), // 🔑 token
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Login de usuario
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user && (await user.comparePassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id), // 🔑 token
      });
    } else {
      res.status(401).json({ message: "Credenciales inválidas" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

import protect from "../middleware/authMiddleware.js";

// Ejemplo: obtener perfil del usuario autenticado
router.get("/profile", protect, (req, res) => {
  res.json(req.user);
});
