const express = require("express");
const Article = require("../models/Article");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    console.log("Received data:", req.body); // Debugging log

    const newArticle = new Article(req.body);
    await newArticle.save();

    res.status(201).json({ message: "Article added successfully", article: newArticle });
  } catch (error) {
    console.error("Error saving article:", error);
    res.status(500).json({ message: "Failed to add article", error: error.message });
  }
  // ✅ Add article to the database
router.post("/new", async (req, res) => {
  try {
    const { CC, Ref, Saison, DateDeSaisie } = req.body;

    if (!CC || !Ref || !Saison || !DateDeSaisie) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newArticle = new Article({ CC, Ref, Saison, DateDeSaisie });
    await newArticle.save();

    res.status(201).json({ message: "Article added successfully", article: newArticle });
  } catch (error) {
    res.status(500).json({ error: "Failed to add article", details: error.message });
  }
});
});

module.exports = router;
 