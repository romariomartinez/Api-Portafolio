// src/routes/about.routes.js
const express = require("express");
const auth = require("../middlewares/auth.middleware");
const { get, update } = require("../controllers/about.controller");

const router = express.Router();

// Obtener About (público)
router.get("/", get);

// Actualizar o crear About (único, no requiere id en params)
router.put("/", auth, update);

module.exports = router;
