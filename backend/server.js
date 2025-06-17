// backend/server.js
require("dotenv").config();
console.log("MONGO_URI from env:", process.env.MONGO_URI);
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");




const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("✅ MongoDB connected");
}).catch((err) => {
  console.error("❌ MongoDB connection error:", err);
});

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// Basic route
app.get("/", (req, res) => {
  res.send("DocSpot backend is running 🚀");
});

// Listen
app.listen(PORT, () => {
  console.log(`🌐 Server is running at http://localhost:${PORT}`);
});
