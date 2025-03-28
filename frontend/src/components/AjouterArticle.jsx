import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import "../styles/AjouterArticle.css";

const AjouterContrainte = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [newContrainte, setNewContrainte] = useState({
    CC: "",
    Ref: "",
    Saison: "",
    DateDeSaisie: "",
    ProblemesRisques: "",
    LesM: "",
    DetailsM: "",
    Actions: "",
    Description: "",
    Media: null, // Removed unused IMAGE field
    Type: "",
    Intensite: "",
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setNewContrainte({
      ...newContrainte,
      [name]: type === "file" ? files[0] : value,
    });
  };

  const handleAddContrainte = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const formData = new FormData();
      Object.keys(newContrainte).forEach((key) => {
        if (newContrainte[key]) {
          formData.append(key, newContrainte[key]);
        }
      });

      const response = await fetch("http://localhost:3000/contraintes/new", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Erreur lors de l'ajout");

      setMessage("✅ Contrainte ajoutée avec succès !");
      setIsPopupOpen(true);

      // Réinitialisation de l'état après soumission
      setNewContrainte({
        CC: "",
        Ref: "",
        Saison: "",
        DateDeSaisie: "",
        ProblemesRisques: "",
        LesM: "",
        DetailsM: "",
        Actions: "",
        Description: "",
        Media: null,
        Type: "",
        Intensite: "",
      });

      // Fermer le popup après 2 secondes, puis rediriger
      setTimeout(() => {
        setIsPopupOpen(false);
        navigate("/home");
      }, 2000);
    } catch (error) {
      setMessage("❌ Erreur lors de l'ajout de la contrainte.");
      console.error("Erreur :", error);
    }
  };

  const handleGoHome = () => {
    navigate("/home");
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div className="app-container" style={{ marginLeft: "250px" }}>
        <div className="text-center mt-6">
          <button
            onClick={handleGoHome}
            className="px-8 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-300"
          >
            Retour à la page d'accueil
          </button>
        </div>

        <div className="app-bar">
          <h1 className="app-bar-title text-3xl font-bold text-center text-blue-600">
            Ajouter une Contrainte
          </h1>
        </div>

        <div className="max-w-[800px] mx-auto mt-10 p-6 bg-gradient-to-r from-blue-200 to-blue-500 rounded-lg shadow-lg">
          <form onSubmit={handleAddContrainte} className="space-y-6">
            {["CC", "Ref", "Saison", "LesM", "DetailsM", "Actions", "Type"].map(
              (field) => (
                <div key={field} className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 capitalize mb-2">
                    {field} :
                  </label>
                  <input
                    type="text"
                    name={field}
                    className="p-3 border border-blue-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder={field}
                    value={newContrainte[field]}
                    onChange={handleChange}
                    required
                  />
                </div>
              )
            )}

            {/* Champ de sélection de date */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 capitalize mb-2">
                Date de Saisie :
              </label>
              <input
                type="date"
                name="DateDeSaisie"
                className="p-3 border border-blue-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={newContrainte.DateDeSaisie}
                onChange={handleChange}
                required
              />
            </div>

            {/* Champ d'ajout de photo ou vidéo */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 capitalize mb-2">
                Ajouter une photo ou une vidéo :
              </label>
              <input
                type="file"
                name="Media"
                accept="image/*,video/*"
                className="p-3 border border-blue-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                onChange={handleChange}
              />
            </div>

            {/* Sélecteur pour l'intensité */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 capitalize mb-2">
                Intensité :
              </label>
              <select
                name="Intensite"
                className="p-3 border border-blue-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={newContrainte.Intensite}
                onChange={handleChange}
                required
              >
                <option value="">Sélectionner une intensité</option>
                <option value="Faible">Faible</option>
                <option value="Moyenne">Moyenne</option>
                <option value="Forte">Forte</option>
              </select>
            </div>

            <div className="col-span-2 text-center mt-6">
              <button
                type="submit"
                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
              >
                Ajouter
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Popup */}
      {isPopupOpen && (
        <div className="popup-overlay">
          <div className="popup-content">
            <p>{message}</p>
            <button onClick={() => setIsPopupOpen(false)}>Fermer</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AjouterContrainte;
