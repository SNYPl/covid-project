const mongoose = require("mongoose");
// const validate = require("mongoose-validator");
const Schema = mongoose.Schema;

// const nameValidator = [
//   validate({
//     validator: "isLength",
//     arguments: [3, 20],
//     message: "Name should be between 3 and 20 characters",
//   }),
// ];

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minLength: 3,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 3,
  },
  repeatPassword: {
    type: String,
    minLength: 3,
  },
  verified: {
    type: Boolean,
    required: true,
  },
  token: {
    type: String,
    // required: true,
  },
});

module.exports = mongoose.model("user", userSchema);
