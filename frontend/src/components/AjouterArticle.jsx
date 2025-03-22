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
    Illustration: null,
    IMAGE: null,
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
        formData.append(key, newContrainte[key]);
      });

      const response = await fetch("http://localhost:3000/contraintes/new", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Erreur lors de l'ajout");

      setMessage("✅ Contrainte ajoutée avec succès !");
      setIsPopupOpen(true);

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
        Illustration: null,
        IMAGE: null,
        Type: "",
        Intensite: "",
      });

      setTimeout(() => {
        setIsPopupOpen(false);
        navigate("/contraintes");
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

      {/* ✅ Pop-up de succès */}
      {isPopupOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <p className="text-green-600 font-semibold text-lg">{message}</p>
            <button
              onClick={() => setIsPopupOpen(false)}
              className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AjouterContrainte;
