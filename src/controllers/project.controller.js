const Project = require("../models/Project");
const uploadToSupabase = require("../utils/uploadToSupabase");

exports.getAll = async (req, res) => {
  const projects = await Project.findAll();
  res.json(projects);
};

exports.create = async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) {
      data.image = await uploadToSupabase(req.file, "projects");
    }
    const project = await Project.create(data);
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const data = { ...req.body };
    if (req.file) {
      data.image = await uploadToSupabase(req.file, "projects");
    }
    await Project.update(data, { where: { id } });
    res.json({ message: "Proyecto actualizado" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const { id } = req.params;
    await Project.destroy({ where: { id } });
    res.json({ message: "Proyecto eliminado" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//Pagination, filtering, and sorting
exports.getAll = async (req, res) => {
  try {
    const { page = 1, limit = 10, stack, order = "createdAt" } = req.query;
    const offset = (page - 1) * limit;

    const where = {};
    if (stack) where.stack = stack;

    const projects = await Project.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset,
      order: [[order, "DESC"]],
    });

    res.json({
      total: projects.count,
      page: parseInt(page),
      pages: Math.ceil(projects.count / limit),
      data: projects.rows,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};