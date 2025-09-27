// src/controllers/about.controller.js
const About = require("../models/About");

exports.get = async (req, res) => {
  try {
    const about = await About.findOne();
    res.json(about || {}); // devuelve {} si no existe
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    let about = await About.findOne();

    if (!about) {
      about = await About.create(req.body); // si no existe, lo crea
    } else {
      await about.update(req.body); // si existe, lo actualiza
    }

    res.json({ message: "Información actualizada", about });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
