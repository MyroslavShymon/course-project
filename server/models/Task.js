const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
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
  _priority: {
    type: Number,
  },
  _done: {
    type: Boolean,
  },
});

module.exports = Task = mongoose.model("task", TaskSchema);
