const Education = require("../models/Education");

exports.getAll = async (req, res) => {
  try {
    const data = await Education.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const edu = await Education.create(req.body);
    res.json(edu);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    await Education.update(req.body, { where: { id } });
    res.json({ message: "Formación actualizada" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const { id } = req.params;
    await Education.destroy({ where: { id } });
    res.json({ message: "Formación eliminada" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
