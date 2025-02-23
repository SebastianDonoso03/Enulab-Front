import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createMenu } from "../../services/menuServices";
import CrearMenus from "../../styles/CrearMenus.css";

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
      setRestaurantId(parseInt(storedRestaurantId, 10));
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
      alert("Error: No se ha seleccionado un restaurante.");
      return;
    }

    try {
      const createdMenu = await createMenu(restaurantId, formData);
      console.log("Menú creado:", createdMenu);
      navigate("/Repertorio");
    } catch (error) {
      console.error("Error al crear el menú:", error.response?.data || error.message);
      alert("Hubo un error al crear el menú. Por favor, inténtalo de nuevo.");
    }
  };

  return (
    <div className="crear-menu-container">
      <div className="crear-menu-content">
        <div className="crear-menu-card">
          <h2 className="text-center">Crear Menú</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              className="crear-menu-input"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nombre del Menú"
              required
            />
            <input
              type="text"
              name="description"
              className="crear-menu-input"
              value={formData.description}
              onChange={handleChange}
              placeholder="Descripción"
              required
            />
            <div className="mt-4">
              <button type="submit" className="crear-menu-button">Guardar Menú</button>
            </div>
            <div className="text-center mt-4">
              <button type="button" className="crear-menu-link" onClick={() => navigate("/Repertorio")}>Cancelar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CrearMenu;
