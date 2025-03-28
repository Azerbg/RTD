const express = require("express");
const multer = require("multer");
const path = require("path"); // Add this line to import the 'path' module
const Contrainte = require("../models/Contrainte"); // Adjust according to your model
const router = express.Router();

// Storage configuration for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public", "uploads")); // Store files in public/uploads
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Unique filename
  },
});

const upload = multer({ storage: storage });

// Route to handle adding a new 'Contrainte'
router.post("/new", upload.single("Media"), async (req, res) => {
  try {
    const newContrainte = new Contrainte({
      CC: req.body.CC,
      Ref: req.body.Ref,
      Saison: req.body.Saison,
      DateDeSaisie: req.body.DateDeSaisie,
      ProblemesRisques: req.body.ProblemesRisques,
      LesM: req.body.LesM,
      DetailsM: req.body.DetailsM,
      Actions: req.body.Actions,
      Description: req.body.Description,
      Illustration: req.body.Illustration,
      IMAGE: req.body.IMAGE,
      Media: req.file ? req.file.path : null, // Save the file path
      Type: req.body.Type,
      Intensite: req.body.Intensite,
    });

    await newContrainte.save();
    res.status(201).json(newContrainte);
  } catch (error) {
    res.status(400).json({ message: "Error saving contrainte", error });
  }
});

module.exports = router;
