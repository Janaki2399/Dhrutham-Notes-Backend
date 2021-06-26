const express = require("express");
const router = express.Router();
const {
  addNote,
  getAllNotes,
  updateNote,
  deleteLabelInNote,
} = require("../controllers/notes.controller");
router.post("/", addNote);
router.get("/", getAllNotes);
router.post("/:noteId", updateNote);
router.delete("/:noteId/labels/:labelId", deleteLabelInNote);
module.exports = router;
