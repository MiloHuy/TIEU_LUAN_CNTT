const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Register_otp = new Schema({
  gmail: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  otp_expires_at: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Register_otp", Register_otp);
