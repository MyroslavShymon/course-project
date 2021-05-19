const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReminderSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: "users" },
  title: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  pin: {
    type: Boolean,
  },
  group: {
    type: String,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  done: {
    type: Boolean,
  },
});

module.exports = Reminder = mongoose.model("reminder", ReminderSchema);
