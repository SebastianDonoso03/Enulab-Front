import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createMenu } from "../../services/menuServices";
import "bootstrap/dist/css/bootstrap.min.css";

const CrearMenu = () => {
  const navigate = useNavigate();
  const [restaurantId, setRestaurantId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    const storedRestaurantId = localStorage.getItem("selectedRestaurantId");
    console.log("ID del restaurante en localStorage:", storedRestaurantId);

    if (storedRestaurantId) {
      setRestaurantId(storedRestaurantId);
    } else {
      console.error("No se encontró el restaurantId en localStorage.");
      navigate("/restaurantes");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!restaurantId) {
      console.error("No se puede crear un menú sin restaurantId.");
      return;
    }

    try {
      const createdMenu = await createMenu(restaurantId, formData);
      console.log("Menú creado:", createdMenu);
      navigate("/Repertorio");
    } catch (error) {
      console.error("Error al crear el menú:", error);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100" style={{ color: "gold" }}>
      <div className="card p-4 shadow-lg" style={{ maxWidth: "500px", width: "100%", borderRadius: "15px", backgroundColor: "#222", border: "2px solid gold" }}>
        <h2 className="text-center mb-4" style={{ color: "gold" }}>Creación de Menú</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nombre del Menú</label>
            <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Descripción</label>
            <input type="text" className="form-control" name="description" value={formData.description} onChange={handleChange} required />
          </div>
          <div className="d-flex justify-content-between">
            <button type="button"  className="btn btn-warning text-dark" onClick={() => navigate("/Repertorio")}>Atrás</button>
            <button type="submit"  className="btn btn-warning text-dark">Guardar Menú</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CrearMenu;
