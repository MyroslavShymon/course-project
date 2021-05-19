const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: "users" },
  _title: {
    type: String,
  },
  _description: {
    type: String,
    required: true,
  },
  _pin: {
    type: Boolean,
  },
  _group: {
    type: String,
  },
});

module.exports = Note = mongoose.model("note", NoteSchema);
