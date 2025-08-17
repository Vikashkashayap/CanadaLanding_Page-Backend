const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// ✅ Middlewares
app.use(cors());
app.use(express.json());

// ✅ MongoDB Connection (direct URI without .env)
mongoose
  .connect("mongodb+srv://vikashkashyap756:Welcome%401234@canada-form.ba6ezdb.mongodb.net/canadaForm?retryWrites=true&w=majority&appName=canada-Form", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// ✅ Schema
const formSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
});

// ✅ Model
const FormData = mongoose.model("FormData", formSchema);

// ✅ Test Route
app.get("/", (req, res) => {
  res.send("🚀 API is running...");
});

// ✅ POST API (save form data)
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

// ✅ GET API (fetch all form data)
app.get("/api/form", async (req, res) => {
  try {
    const data = await FormData.find();
    res.json(data);
  } catch (error) {
    console.error("❌ Error fetching data:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// ✅ Server listen
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
