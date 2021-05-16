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
  story: [{ type: Schema.Types.ObjectId, ref: "story" }],
});

module.exports = User = mongoose.model("users", UserSchema);
