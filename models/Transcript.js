const mongoose = require("mongoose");
const { Schema } = mongoose;

const TranscriptSchema = new Schema({
  link: {
    type: String,
    required: true,
  },
  transcript: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("transcript", TranscriptSchema);
