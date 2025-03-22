const mongoose = require("mongoose");

const ContrainteSchema = new mongoose.Schema({
  CC: String,
  Ref: String,
  Saison: String,
  DateDeSaisie: Date,
  ProblemesRisques: String,
  LesM: String,
  DetailsM: String,
  Actions: String,
  Description: String,
  Illustration: String,
  IMAGE: String,
  Type: String,
  Intensite: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Contrainte", ContrainteSchema);
