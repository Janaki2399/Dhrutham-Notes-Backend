const express = require("express");
const router = express.Router();
const {
  addLabelInNote,
  getLabelsOfUser,
  addLabelToList,
} = require("../controllers/labels.controller");

router.post("/", addLabelInNote);
// router.post("/in-list", addLabelsFromListToNote);
router.post("/to-list", addLabelToList);
router.get("/", getLabelsOfUser);

module.exports = router;
