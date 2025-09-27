const express = require("express");
const { register, login } = require("../controllers/auth.controller");

const router = express.Router();

// Registro de usuario
router.post("/register", register);

// Login de usuario
router.post("/login", login);

module.exports = router;