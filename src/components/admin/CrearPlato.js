import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPlato } from "../../services/dishService";
import CrearPlatos from "../../styles/CrearPlatos.css"
const CrearPlato = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
  });

  const navigate = useNavigate();
  const menuId = localStorage.getItem("selectedMenuId");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!menuId) {
      alert("Error: No se ha seleccionado un menú.");
      return;
    }
    try {
      await createPlato(menuId, formData);
      console.log("Plato agregado:", formData);
      navigate("/Platos");
    } catch (error) {
      console.error("Error al agregar el plato:", error);
      alert("Hubo un error al agregar el plato. Por favor, inténtalo de nuevo.");
    }
  };

  return (
    <div className="crear-plato-container">
      <div className="crear-plato-content">
        <div className="crear-plato-card">
          <h2 className="text-center">Crear Plato</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              className="crear-plato-input"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nombre del Plato"
              required
            />
            <input
              type="text"
              name="description"
              className="crear-plato-input"
              value={formData.description}
              onChange={handleChange}
              placeholder="Descripción"
              required
            />
            <input
              type="number"
              name="price"
              className="crear-plato-input"
              value={formData.price}
              onChange={handleChange}
              placeholder="Precio"
              required
            />
            <div className="mt-4">
              <button type="submit" className="crear-plato-button">Guardar Plato</button>
            </div>
            <div className="text-center mt-4">
              <button type="button" className="crear-plato-link" onClick={() => navigate("/Platos")}>
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CrearPlato;
