const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.middleware");
const {
  getResearchController,
  addResearchController,
  updateResearchController,
  deleteResearchController,
} = require("../controllers/research.controller");

router.get("/", getResearchController);
router.post("/", auth, addResearchController);
router.put("/:id", auth, updateResearchController);
router.delete("/:id", auth, deleteResearchController);

module.exports = router;
