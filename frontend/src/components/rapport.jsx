import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import "../styles/rapport.css";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Rapport = () => {
  const [reports, setReports] = useState([]);
  const [chartData, setChartData] = useState([]);

  const fetchReports = async () => {
    try {
      const response = await axios.get(
        "https://mern-gestion-de-stock-production.up.railway.app/rapport/rapportinventaire"
      );
      setReports(response.data);
      processChartData(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const processChartData = (data) => {
    const processedData = data.map((rapport, index) => ({
      name: `Rapport ${index + 1}`,
      valeur: rapport.total || Math.floor(Math.random() * 100) + 1,
    }));
    setChartData(processedData);
  };

  const generateReport = async () => {
    try {
      await axios.post(
        "https://mern-gestion-de-stock-production.up.railway.app/rapport/generate"
      );
      fetchReports();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div className="Rapport-content">
        <h2>Rapports d'Inventaire</h2>
        <button className="ajouterRap" onClick={generateReport}>
          Générer Rapport d'Inventaire
        </button>

        <div>
          {reports.length > 0 ? (
            <ul
              style={{
                textDecoration: "none",
                listStyleType: "none",
                marginTop: "40px",
              }}
            >
              {reports.map((rapport) => (
                <li key={rapport.id_rapport} className="Link">
                  <div className="rapport-item">
                    <p style={{ color: "white" }}>
                      Rapport #{rapport.id_rapport} -{" "}
                      {new Date(rapport.date_generation).toLocaleDateString()}
                    </p>
                    <a
                      href={`https://mern-gestion-de-stock-production.up.railway.app/public/reports/${rapport.fileName}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rapport-link"
                    >
                      Consulter
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>Loading...</p>
          )}
        </div>

        {/* Graphique en barres */}
        <h3>Analyse des Rapports</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip />
            <Bar dataKey="valeur" fill="#8884d8" barSize={40} />
          </BarChart>
        </ResponsiveContainer>

        {/* Graphique en ligne */}
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <XAxis dataKey="name" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="valeur"
              stroke="#00C49F"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>

        {/* Graphique en camembert */}
        <ResponsiveContainer width="50%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="valeur"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Rapport;
