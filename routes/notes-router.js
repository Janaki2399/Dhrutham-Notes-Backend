const express = require("express");
const router = express.Router();
const {
  addNote,
  getAllNotes,
  updateNote,
  deleteLabelInNote,
  deleteNote,
  addLabelsFromListToNote,
} = require("../controllers/notes.controller");
router.post("/", addNote);
router.get("/", getAllNotes);
router.post("/:noteId", updateNote);
router.post("/:noteId/labels", addLabelsFromListToNote);
router.delete("/:noteId", deleteNote);
router.delete("/:noteId/labels/:labelId", deleteLabelInNote);
module.exports = router;
