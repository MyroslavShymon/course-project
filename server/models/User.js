const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create User Model Schema
const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  note: [{ type: Schema.Types.ObjectId, ref: "note" }],
  task: [{ type: Schema.Types.ObjectId, ref: "task" }],
  reminder: [{ type: Schema.Types.ObjectId, ref: "reminder" }],
});

module.exports = User = mongoose.model("users", UserSchema);
