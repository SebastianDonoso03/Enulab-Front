import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createRestaurant } from "../../services/restaurantServices";
import Swal from "sweetalert2";
import "../../styles/CrearRestaurant.css";

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
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar que todos los campos estén completos
    if (!formData.name || !formData.ubicacion || !formData.objetivos || !formData.descripcion || !formData.logo) {
      Swal.fire({
        icon: "warning",
        title: "Campos incompletos",
        text: "Por favor, completa todos los campos antes de enviar.",
      });
      return;
    }

    try {
      await createRestaurant(formData);
      Swal.fire({
        icon: "success",
        title: "Éxito",
        text: "Restaurante creado exitosamente.",
      }).then(() => navigate("/restaurantes"));
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "Hubo un problema al crear el restaurante.",
      });
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
              required
            />
            <div className="mt-4">
              <button type="submit" className="crear-restaurante-button">Guardar Restaurante</button>
            </div>
            <div className="text-center mt-4">
              <button type="button" className="crear-restaurante-link" onClick={() => navigate("/restaurantes")}>
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CrearRestaurante;
