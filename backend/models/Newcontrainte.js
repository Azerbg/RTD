const mongoose = require("mongoose");

const newArticleSchema = new mongoose.Schema({
  CC: { type: String, required: true },
  Ref: { type: String, required: true },
  Saison: { type: String, required: true },
  DateDeSaisie: { type: Date, required: true },
  ProblemesRisques: { type: String },
  LesM: { type: String },
  DetailsM: { type: String },
  Actions: { type: String },
  Description: { type: String },
  Illustration: { type: String },
  IMAGE: { type: String },
  Type: { type: String },
  Intensite: { type: String },
}, { timestamps: true });

// Create a new collection called "newarticles"
const Newcontrainte = mongoose.model("Newcontrainte", newArticleSchema);

module.exports = Newcontrainte;
