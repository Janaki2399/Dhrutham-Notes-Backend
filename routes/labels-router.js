const express = require("express");
const router = express.Router();
const {
  addLabelInNote,
  getLabelsOfUser,
  addLabelsFromListToNote,
} = require("../controllers/labels.controller");

router.post("/", addLabelInNote);
router.post("/in-list", addLabelsFromListToNote);
router.get("/", getLabelsOfUser);

module.exports = router;
