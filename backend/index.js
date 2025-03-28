const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const multer = require("multer");

const userRoutes = require("./routes/userRoutes");
const CatRoutes = require("./routes/CatRoutes");
const CommandeRoutes = require("./routes/CommandeRoutes");
const FournisseurRoutes = require("./routes/FournisseurRoutes");
const RapportRoutes = require("./routes/RapportsRoutes");
const contraintesRoutes = require("./routes/contrainteRoutes");

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use("/categories", CatRoutes);
app.use("/", userRoutes);
app.use("/commandes", CommandeRoutes);
app.use("/fournisseur", FournisseurRoutes);
app.use("/rapport", RapportRoutes);
app.use("/contraintes", contraintesRoutes);
app.use("/public", express.static(path.join(__dirname, "public")));


// Setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "public", "uploads")); // Store uploaded files in "public/uploads"
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Ensure unique file names
  },
});

// Multer instance for single file upload
const upload = multer({ storage: storage });

// Example of how you would use multer for file uploads in a specific route
app.post("/contraintes/new", upload.single("Media"), (req, res) => {
  if (req.file) {
    console.log("File uploaded:", req.file); // File info will be available in req.file
  }
  console.log("Form Data:", req.body); // Access other form data here
  res.send("File uploaded successfully");
});

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => console.log("MongoDB connection error:", error));
