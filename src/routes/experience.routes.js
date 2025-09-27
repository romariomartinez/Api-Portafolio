const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.middleware");
const ctrl = require("../controllers/experience.controller");

router.get("/", ctrl.getAll);
router.post("/", auth, ctrl.create);
router.put("/:id", auth, ctrl.update);
router.delete("/:id", auth, ctrl.remove);

module.exports = router;
