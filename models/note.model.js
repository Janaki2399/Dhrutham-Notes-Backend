const mongoose = require("mongoose");
const { Schema } = mongoose;

const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    text: String,
    isPinned: Boolean,
    color: String,
    labelList: [{ type: Schema.Types.ObjectId, ref: "Label" }],
  },
  { timestamps: true }
);
const Note = mongoose.model("Note", noteSchema);

module.exports = { Note };
