const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: function () { return !this.mobile; } },
  mobile: { type: String, required: function () { return !this.email; } },
  password: { type: String, required: true },
  role: { type: String, enum: ["customer", "doctor"], default: "customer" },
  specialization: { type: String },
  experience: { type: String },
  clinicAddress: { type: String }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
