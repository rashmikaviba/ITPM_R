const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  Username: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure email is unique
  },
  Password: {
    type: String,
    required: true,
  },
  Contract: {
    type: Number,
    required: false,
  },
  Nationality: {
    type: String,
    required: false,
  },
  Gender: {
    type: String,
    required: false,
  },
  address: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("User", userSchema);
