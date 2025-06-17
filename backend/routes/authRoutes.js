const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");

// Register
router.post("/register", async (req, res) => {
  try {
    const {
      name,
      email,
      mobile,
      password,
      role,
      specialization,
      experience,
      clinicAddress
    } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({
      $or: [{ email }, { mobile }]
    });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user object
    const newUser = new User({
      name,
      email,
      mobile,
      password: hashedPassword,
      role,
      specialization: role === "doctor" ? specialization : undefined,
      experience: role === "doctor" ? experience : undefined,
      clinicAddress: role === "doctor" ? clinicAddress : undefined
    });

    await newUser.save();
    res.status(201).json({ message: "✅ Registered successfully" });

  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { identifier, password } = req.body;

    const user = await User.findOne({
      $or: [{ email: identifier }, { mobile: identifier }]
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    res.status(200).json({
      message: "✅ Login successful",
      user: {
        name: user.name,
        role: user.role,
        email: user.email,
        mobile: user.mobile
      }
    });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
