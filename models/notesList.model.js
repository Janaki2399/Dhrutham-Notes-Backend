const mongoose = require("mongoose");
const { Schema } = mongoose;

const notesListSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: { unique: true },
  },
  list: [{ type: Schema.Types.ObjectId, ref: "Note" }],
});
const NotesList = mongoose.model("notesList", notesListSchema);

module.exports = { NotesList };
