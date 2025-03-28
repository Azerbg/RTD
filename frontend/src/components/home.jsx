import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import pour la navigation
import Sidebar from "./Sidebar";
import "../styles/home.css";

// Hook de récupération de données avec refresh
const useFetchData = (url, refresh) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Erreur de chargement depuis ${url}`);
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, refresh]);

  return { data, loading, error, setData };
};

const Home = () => {
  const navigate = useNavigate(); // Hook pour rediriger
  const [refresh, setRefresh] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);

  const {
    data: articles,
    loading,
    error,
  } = useFetchData(
    "http://localhost:3000/contraintes",
    refresh
  );

  const handleDeleteArticle = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3000/contraintes/${id}`,
        { method: "DELETE" }
      );
      if (!response.ok) throw new Error("Échec de la suppression");
      setRefresh((prev) => !prev);
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    }
  };

  const handleUpdateArticle = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3000/contraintes/${editingArticle.id_article}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editingArticle),
        }
      );
      if (!response.ok) throw new Error("Échec de la mise à jour");
      setEditingArticle(null);
      setRefresh((prev) => !prev);
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div className="home-content" style={{ marginLeft: "20px" }}>
        <div className="Ban">Dashboard</div>

        {/* Bouton Ajouter avec navigation vers une autre page */}
        <button
          onClick={() => navigate("/ajouter-article")}
          className="ajouter"
        >
          Ajouter
        </button>

        {loading ? (
          <p>Chargement...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <table className="article-table">
            <thead>
              <tr>
                <th>CC</th>
                <th>Ref</th>
                <th>Saison</th>
                <th>Date de saisie</th>
                <th>Problèmes / Risques</th>
                <th>Les M</th>
                <th>Details M</th>
                <th>Actions</th>
                <th>Description</th>
                <th>Illustration</th>
                <th>Type</th>
                <th>Intensité</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article) => (
                <tr key={article.id_article}>
                  {Object.values(article).map((value, index) => (
                    <td key={index}>{value}</td>
                  ))}
                  <td>
                    <button
                      className="buttonAR Del"
                      onClick={() => handleDeleteArticle(article.id_article)}
                    >
                      Supprimer
                    </button>
                    <button
                      className="buttonAR Ed"
                      onClick={() => setEditingArticle(article)}
                    >
                      Modifier
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {editingArticle && (
          <div className="editP">
            <form onSubmit={handleUpdateArticle}>
              {Object.keys(editingArticle).map((field) => (
                <input
                  key={field}
                  type="text"
                  placeholder={field}
                  value={editingArticle[field]}
                  onChange={(e) =>
                    setEditingArticle({
                      ...editingArticle,
                      [field]: e.target.value,
                    })
                  }
                />
              ))}
              <button type="submit">Mettre à jour</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
