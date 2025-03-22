const express = require("express");
const router = express.Router();
const multer = require("multer");
const Contrainte = require("../models/Contrainte");

// 📌 Configuration Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// 📌 Ajouter une nouvelle contrainte
router.post(
  "/new",
  upload.fields([{ name: "Illustration" }, { name: "IMAGE" }]),
  async (req, res) => {
    try {
      const newContrainte = new Contrainte({
        ...req.body,
        Illustration: req.files["Illustration"]
          ? req.files["Illustration"][0].path
          : null,
        IMAGE: req.files["IMAGE"] ? req.files["IMAGE"][0].path : null,
      });

      await newContrainte.save();
      res.status(201).json({ message: "Contrainte ajoutée avec succès !" });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Erreur lors de l'ajout de la contrainte" });
    }
  }
);

module.exports = router;
