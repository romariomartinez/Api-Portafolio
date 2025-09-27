const express = require("express");
const auth = require("../middlewares/auth.middleware");
const upload = require("../middlewares/upload.middleware");
const validate = require("../middlewares/validate.middleware");
const projectSchema = require("../validators/project.validator");

const {
  getAll,
  create,
  update,
  remove,
} = require("../controllers/project.controller");

const router = express.Router();

router.get("/", getAll);
router.post("/", auth, upload.single("icon"), create);
router.put("/:id", auth, upload.single("icon"), update);
router.delete("/:id", auth, remove);
router.post("/", auth, upload.single("image"), validate(projectSchema), create);
router.put("/:id", auth, upload.single("image"), validate(projectSchema), update);

module.exports = router;
