const Skill = require("../models/Skill");
const uploadToSupabase = require("../utils/uploadToSupabase");

exports.getAll = async (req, res) => {
  const skills = await Skill.findAll();
  res.json(skills);
};

exports.create = async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) {
      data.icon = await uploadToSupabase(req.file, "skills");
    }
    const skill = await Skill.create(data);
    res.json(skill);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const data = { ...req.body };
    if (req.file) {
      data.icon = await uploadToSupabase(req.file, "skills");
    }
    await Skill.update(data, { where: { id } });
    res.json({ message: "Skill actualizada" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const { id } = req.params;
    await Skill.destroy({ where: { id } });
    res.json({ message: "Skill eliminada" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
