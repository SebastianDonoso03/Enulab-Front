import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createRestaurant } from "../../services/restaurantServices";
import "../../styles/CrearRestaurant.css";
import { div, h2 } from "framer-motion/client";

const CrearRestaurante = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    ubicacion: "",
    objetivos: "",
    descripcion: "",
    logo: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createRestaurant(formData);
      console.log("Restaurante creado exitosamente");
      navigate("/inicio");
    } catch (error) {
      console.error("Error al crear el restaurante:", error.message);
      alert(error.message);
    }
  };

  return (
    
    <div className="crear-restaurante-container">
      <div className="crear-restaurante-content">
        <div className="crear-restaurante-card">
          <h2 className="text-center">Crear Restaurante</h2>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            {[ 
              { id: "name", placeholder: "Nombre del Restaurante" },
              { id: "ubicacion", placeholder: "Ubicación" },
              { id: "objetivos", placeholder: "Objetivos" }
            ].map(({ id, placeholder }) => (
              <input
                key={id}
                type="text"
                name={id}
                className="crear-restaurante-input"
                value={formData[id]}
                onChange={handleChange}
                placeholder={placeholder}
                required
              />
            ))}
            <textarea
              name="descripcion"
              className="crear-restaurante-input"
              value={formData.descripcion}
              onChange={handleChange}
              placeholder="Descripción del Negocio"
              required
            ></textarea>
            <input
              type="file"
              name="logo"
              className="crear-restaurante-input"
              accept="image/*"
              onChange={handleChange}
            />
            <div className="mt-4">
              <button type="submit" className="crear-restaurante-button">Guardar Restaurante</button>
            </div>
            <div className="text-center mt-4">
              <button type="button" className="crear-restaurante-link" onClick={() => navigate("/restaurantes")}>Cancelar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    
  );
};

export default CrearRestaurante;
