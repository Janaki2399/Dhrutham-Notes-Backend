const mongoose = require("mongoose");
const { Schema } = mongoose;

const labelSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});
const Label = mongoose.model("Label", labelSchema);

module.exports = { Label };
