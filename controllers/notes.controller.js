const { Note } = require("../models/note.model");
const { NotesList } = require("../models/notesList.model");
const addNote = async (req, res) => {
  try {
    const { userId } = req.user;

    const body = req.body;
    const note = new Note(body);
    await note.save();
    let noteList = await NotesList.findOne({ user: userId });
    //   const newNoteList = "";
    if (!noteList) {
      noteList = new NotesList({ user: userId, list: [] });
    }
    await noteList.list.push(note.id);
    await noteList.save();
    res.status(200).json({ success: true, note: note });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      errorMessage: "Unable to add the note.Try again Later",
    });
  }
};

const getAllNotes = async (req, res) => {
  try {
    const { userId } = req.user;
    let noteList = await NotesList.findOne({ user: userId }).populate({
      path: "list",
    });
    res.status(200).json({ success: true, noteList: noteList.list });
  } catch (error) {
    res.status(500).json({
      success: false,
      errorMessage: "Unable to fetch notes.Try again later",
    });
  }
};
module.exports = { addNote, getAllNotes };
