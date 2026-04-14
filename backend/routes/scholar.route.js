const express = require("express");
const router = express.Router();

const {
  createScholar,
  getAllScholars,
  getScholarById,
  updateScholar,
  deleteScholar,
  bulkUploadController
} = require("../controllers/scholar.controller");

router.post("/", createScholar);
router.post("/bulk-upload", bulkUploadController);

router.get("/", getAllScholars);

router.get("/:id", getScholarById);

router.put("/:id", updateScholar);

router.delete("/:id", deleteScholar);

module.exports = router;