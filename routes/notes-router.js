const express = require("express");
const router = express.Router();
const { addNote, getAllNotes } = require("../controllers/notes.controller");
router.post("/", addNote);
router.get("/", getAllNotes);
module.exports = router;
