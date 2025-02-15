import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Menu.css";

const CrearBebida = () => {
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
    console.log("Bebida agregada:", formData);
    navigate("/Bebidas");
  };
  return (
    <div className="global-container">
      <h2 className="global-header">Creación de Bebida</h2>
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
            className="btn btn-warning text-dark"
            onClick={() => navigate("/Bebidas")}
          >
            Atrás
          </button>
          <button type="submit"  className="btn btn-warning text-dark">
            Continuar
          </button>
        </div>
      </form>
    </div>
  );
};

export default CrearBebida;
