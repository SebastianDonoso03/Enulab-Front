import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createMenu } from "../../services/menuServices";
import "../../styles/Menu.css";

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
      navigate("/restaurantes"); // Redirigir si no hay ID
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
    <div className="global-container">
      <h2 className="global-header">Creación de Menú</h2>
      <form className="global-form" onSubmit={handleSubmit}>
        <label>Nombre del Menú</label>
        <input
          type="text"
          name="name" // Corregido para coincidir con formData
          onChange={handleChange}
          required
        />

        <label>Descripción del Menú</label>
        <input
          type="text"
          name="description" // Corregido para coincidir con formData
          onChange={handleChange}
          required
        />

        <div className="form-buttons">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/Repertorio")}
          >
            Atrás
          </button>
          <button type="submit" className="btn btn-primary">
            Continuar
          </button>
        </div>
      </form>
    </div>
  );
};

export default CrearMenu;
