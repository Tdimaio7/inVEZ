import { Router } from "express";
import Project from "../models/project.js";
import protect from "../middleware/authMiddleware.js";

const router = Router();

// Crear proyecto (solo usuario autenticado)
router.post("/", protect, async (req, res) => {
  try {
    const { title, description, sector, stage, investmentRequired } = req.body;

    const project = new Project({
      title,
      description,
      sector,
      stage,
      investmentRequired,
      founder: req.user._id,
    });

    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Obtener todos los proyectos del usuario autenticado
router.get("/", protect, async (req, res) => {
  try {
    const projects = await Project.find({ founder: req.user._id });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Obtener detalle de proyecto por ID (solo fundador)
router.get("/:id", protect, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Proyecto no encontrado" });

    if (project.founder.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Acceso denegado" });
    }

    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Actualizar proyecto (solo fundador)
router.put("/:id", protect, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Proyecto no encontrado" });

    if (project.founder.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Acceso denegado" });
    }

    const { title, description, sector, stage, investmentRequired } = req.body;

    project.title = title || project.title;
    project.description = description || project.description;
    project.sector = sector || project.sector;
    project.stage = stage || project.stage;
    project.investmentRequired = investmentRequired || project.investmentRequired;

    await project.save();
    res.json(project);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Eliminar proyecto (solo fundador)
router.delete("/:id", protect, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Proyecto no encontrado" });

    if (project.founder.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Acceso denegado" });
    }

    await project.deleteOne();
    res.json({ message: "Proyecto eliminado" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
