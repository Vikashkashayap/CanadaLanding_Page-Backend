const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ✅ Middlewares
app.use(cors()); // sab domains allowed
app.use(express.json()); // JSON parse karega

// ✅ MongoDB connect

mongoose.connect("mongodb+srv://vikashkashyap756:Welcome%401234@canada-form.ba6ezdb.mongodb.net/?retryWrites=true&w=majority&appName=canada-Form", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.log("❌ MongoDB Error:", err));

// ✅ Schema
const formSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
});

// ✅ Model
const FormData = mongoose.model("FormData", formSchema);

// ✅ Test Route
app.get("/", (req, res) => {
  res.send("🚀 API is running...");
});

// ✅ POST API (form data save karne ke liye)
app.post("/api/form", async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newForm = new FormData({ name, email, phone });
    await newForm.save();

    res.status(201).json({
      message: "✅ Form data saved successfully",
      data: newForm,
    });
  } catch (error) {
    console.error("❌ Error saving form:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// ✅ GET API (saare form data fetch karne ke liye)
app.get("/api/form", async (req, res) => {
  try {
    const data = await FormData.find();
    res.json(data);
  } catch (error) {
    console.error("❌ Error fetching data:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// ✅ Server listen (deployment friendly)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
