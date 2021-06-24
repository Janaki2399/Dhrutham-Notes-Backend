const { Note } = require("../models/note.model");
const { NotesList } = require("../models/notesList.model");
export const addNote = async (req, res) => {
  try {
    const { userId } = req.user;
    const body = req.body;
    const note = new Note(body);
    let noteList = await NotesList.findOne({ user: userId });
    //   const newNoteList = "";
    if (!noteList) {
      noteList = new NotesList({ user: userId, list: [] });
    }
    await noteList.list.push(note.id);
    await noteList.save();
    res.status(200).json({ success: true, note: noteList });
  } catch (error) {
    res.status(500).json({
      success: false,
      errorMessage: "Unable to add the note.Try again Later",
    });
  }
};
module.exports = { addNote };
