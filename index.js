const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json()); // form se aaya JSON data parse karega

// ✅ MongoDB connect
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.log("❌ Error: ", err));

// ✅ Schema banao
const formSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String
});

// ✅ Model
const FormData = mongoose.model("FormData", formSchema);

// ✅ POST API (form data save karne ke liye)
app.post("/api/form", async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const newForm = new FormData({ name, email, phone });
    await newForm.save();
    res.status(201).json({ message: "Form data saved successfully", data: newForm });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

// ✅ GET API (data fetch karne ke liye)
app.get("/api/form", async (req, res) => {
  const data = await FormData.find();
  res.json(data);
});

// ✅ Server listen
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
