const { Note } = require("../models/note.model");
const { NotesList } = require("../models/notesList.model");
const { extend } = require("lodash");
const addNote = async (req, res) => {
  try {
    const { userId } = req.user;

    const body = req.body;
    const note = new Note(body);
    await note.save();
    let noteList = await NotesList.findOne({ user: userId });
    if (!noteList) {
      noteList = new NotesList({ user: userId, list: [] });
    }
    await noteList.list.push(note._id);
    await noteList.save();
    const populatedNote = await note
      .populate({ path: "labelList" })
      .execPopulate();

    res.status(200).json({ success: true, note: populatedNote });
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
    let noteList = await NotesList.findOne({ user: userId });
    if (!noteList) {
      noteList = new NotesList({ user: userId, list: [] });
    }

    const populatedNoteList = await noteList
      .populate({
        path: "list",
        populate: { path: "labelList", select: "name _id" },
      })

      .execPopulate();

    res.status(200).json({ success: true, noteList: populatedNoteList.list });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      errorMessage: "Unable to fetch notes.Try again later",
    });
  }
};

const updateNote = async (req, res) => {
  try {
    const noteId = req.params.noteId;
    const note = await Note.findById(noteId);

    const updatedProperty = req.body;
    const updatedNote = extend(note, updatedProperty);
    await updatedNote.save();

    res.status(200).json({ success: true, note: updatedNote });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, errorMessage: "Something went wrong" });
  }
};

const deleteLabelInNote = async (req, res) => {
  try {
    const noteId = req.params.noteId;
    const labelId = req.params.labelId;

    const note = await Note.findById(noteId);
    note.labelList.pull(labelId);
    await note.save();

    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      errorMessage: "Unable to fetch notes.Try again later",
    });
  }
};
const deleteNote = async (req, res) => {
  try {
    const { userId } = req.user;
    const noteId = req.params.noteId;

    const noteList = await NotesList.findOne({ user: userId });

    noteList.list.pull(noteId);
    await noteList.save();
    await Note.deleteOne({ noteId });

    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      errorMessage: "Unable to fetch notes.Try again later",
    });
  }
};
const addLabelsFromListToNote = async (req, res) => {
  try {
    const { userId } = req.user;
    const noteId = req.params.noteId;
    const { label } = req.body;
    const note = await Note.findById(noteId);
    note.labelList.push(label._id);
    await note.save();
    res.status(200).json({ success: true, label });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      errorMessage: "Unable to add label.Try again Later",
    });
  }
};
// const addLabelInNote = async (req, res) => {
//   try {
//     const { userId } = req.user;

//     const { noteId, labelName } = req.body;

//     const label = new Label({ name: labelName });

//     await label.save();
//     let labelsList = await LabelsList.findOne({ user: userId });
//     if (!labelsList) {
//       labelsList = new LabelsList({ user: userId, list: [] });
//     }
//     await labelsList.list.push(label._id);
//     await labelsList.save();

//     const note = await Note.findById(noteId);
//     note.labelList.push(label._id);
//     await note.save();
//     res.status(200).json({ success: true, label });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       success: false,
//       errorMessage: "Unable to add label.Try again Later",
//     });
//   }
// };

module.exports = {
  addNote,
  getAllNotes,
  updateNote,
  deleteLabelInNote,
  addLabelsFromListToNote,
  deleteNote,
};
