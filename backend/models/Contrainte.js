const mongoose = require('mongoose');

// Check if the model is already registered, otherwise create it
const Contrainte = mongoose.models.Contrainte || mongoose.model('Contrainte', new mongoose.Schema({
  CC: String,
  Ref: String,
  Saison: String,
  DateDeSaisie: Date,
  ProblemesRisques: String,
  LesM: String,
  DetailsM: String,
  Actions: String,
  Description: String,
  Type: String,
  Intensite: String,
  IMAGE: String,
  DateCreation: { type: Date, default: Date.now },
  media: String, // Optional: media for file upload
}));

module.exports = Contrainte;
