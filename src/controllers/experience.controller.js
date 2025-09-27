const Experience = require("../models/Experience");

exports.getAll = async (req, res) => {
  try {
    const data = await Experience.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const exp = await Experience.create(req.body);
    res.json(exp);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    await Experience.update(req.body, { where: { id } });
    res.json({ message: "Experiencia actualizada" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const { id } = req.params;
    await Experience.destroy({ where: { id } });
    res.json({ message: "Experiencia eliminada" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
