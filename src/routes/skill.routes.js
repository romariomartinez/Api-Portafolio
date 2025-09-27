const express = require("express");
const auth = require("../middlewares/auth.middleware");
const {
  getAll,
  create,
  update,
  remove,
} = require("../controllers/skill.controller");

const router = express.Router();

router.get("/", getAll);
router.post("/", auth, create);
router.put("/:id", auth, update);
router.delete("/:id", auth, remove);

module.exports = router;
