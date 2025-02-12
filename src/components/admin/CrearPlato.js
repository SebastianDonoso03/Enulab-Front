import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPlato } from "../../services/dishService";  // Importa el servicio
import "../../styles/Menu.css";

const CrearPlato = () => {
  const [formData, setFormData] = useState({
    name: "", // Cambié "nombre" a "name"
    description: "", // Cambié "descripcion" a "description"
    price: "",
  });

  const navigate = useNavigate();
  const menuId = localStorage.getItem("selectedMenuId"); // Recuperamos el ID del menú desde localStorage

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (menuId) {
      try {
        // Crear plato usando el servicio
        await createPlato(menuId, formData);
        console.log("Plato agregado:", formData);
        navigate("/Platos"); // Redirigir a la página de platos
      } catch (error) {
        console.error("Error al agregar el plato:", error);
      }
    } else {
      console.error("No se encontró el ID del menú.");
    }
  };

  return (
    <div className="global-container">
      <h2 className="global-header">Creación de Plato</h2>
      <form className="global-form" onSubmit={handleSubmit}>
        <label>Nombre</label>
        <input
          type="text"
          name="name" // Cambié el name de "nombre" a "name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label>Descripción</label>
        <input
          type="text"
          name="description" // Cambié el name de "descripcion" a "description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <label>Precio</label>
        <input
          type="number"
          name="price" // Cambié el name de "precio" a "price"
          value={formData.price}
          onChange={handleChange}
          required
        />
        
        <div className="form-buttons">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/Platos")}
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

export default CrearPlato;
