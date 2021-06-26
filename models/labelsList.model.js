const mongoose = require("mongoose");
const { Schema } = mongoose;

const labelsListSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: { unique: true },
  },
  list: [{ type: Schema.Types.ObjectId, ref: "Label" }],
});
const LabelsList = mongoose.model("labelsList", labelsListSchema);

module.exports = { LabelsList };
