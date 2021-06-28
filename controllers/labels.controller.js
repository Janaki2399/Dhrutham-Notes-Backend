const { Note } = require("../models/note.model");
const { Label } = require("../models/label.model");
const { LabelsList } = require("../models/labelsList.model");

const addLabelInNote = async (req, res) => {
  try {
    const { userId } = req.user;

    const { noteId, labelName } = req.body;

    const label = new Label({ name: labelName });

    await label.save();
    let labelsList = await LabelsList.findOne({ user: userId });
    if (!labelsList) {
      labelsList = new LabelsList({ user: userId, list: [] });
    }
    await labelsList.list.push(label._id);
    await labelsList.save();

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

// const addLabelsFromListToNote = async (req, res) => {
//   try {
//     const { userId } = req.user;
//     const { noteId, label } = req.body;
//     const note = await Note.findById(noteId);
//     note.labelList.push(label.id);
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
const addLabelToList = async (req, res) => {
  try {
    const { userId } = req.user;
    const { labelName } = req.body;
    const label = new Label({ name: labelName });
    await label.save();
    const labelList = await LabelsList.findOne({ user: userId });
    labelList.list.push(label);
    await labelList.save();
    res.status(200).json({ success: true, label });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      errorMessage: "Unable to add label.Try again Later",
    });
  }
};
const getLabelsOfUser = async (req, res) => {
  try {
    const { userId } = req.user;
    let labelsList = await LabelsList.findOne({ user: userId });
    if (!labelsList) {
      labelsList = new LabelsList({ user: userId, list: [] });
    }
    const populatedLabelsList = await labelsList
      .populate({
        path: "list",
      })
      .execPopulate();

    res
      .status(200)
      .json({ success: true, labelsList: populatedLabelsList.list });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      errorMessage: "Unable to fetch notes.Try again later",
    });
  }
};

module.exports = {
  addLabelInNote,
  getLabelsOfUser,
  addLabelToList,
};
