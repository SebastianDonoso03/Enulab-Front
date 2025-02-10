import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Menu.css";

const CrearPlato = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Plato agregado:", formData);
    navigate("/Platos");
  };
  return (
    <div className="global-container">
      <h2 className="global-header">Creación de Plato</h2>
      <form className="global-form" onSubmit={handleSubmit}>
        <label>Nombre</label>
        <input type="text" name="nombre" onChange={handleChange} required />

        <label>Descripción</label>
        <input
          type="text"
          name="descripcion"
          onChange={handleChange}
          required
        />

        <label>Precio</label>
        <input type="number" name="precio" onChange={handleChange} required />
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
