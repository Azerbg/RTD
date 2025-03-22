const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
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
  IMAGE: { type: String }, // Base64 image or URL
  Type: { type: String },
  Intensite: { type: String },
}, { timestamps: true });

const Article = mongoose.model("Article", articleSchema);
module.exports = Article;
