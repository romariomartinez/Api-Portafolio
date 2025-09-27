const Certification = require("../models/Certification");

exports.getAll = async (req, res) => {
  const certifications = await Certification.findAll();
  res.json(certifications);
};

exports.create = async (req, res) => {
  try {
    const cert = await Certification.create(req.body);
    res.json(cert);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    await Certification.update(req.body, { where: { id } });
    res.json({ message: "Certificación actualizada" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const { id } = req.params;
    await Certification.destroy({ where: { id } });
    res.json({ message: "Certificación eliminada" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
