import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/CrearPlato.css";

const CrearPlato = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    porciones: "",
    subcategoria: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Plato agregado:", formData);
    navigate("/menu"); 
  };
  return (
    <div className="plato-container">
      <h2 className="plato-header">Creación de plato</h2>
      <form className="plato-form" onSubmit={handleSubmit}>
        <label>Nombre del plato</label>
        <input type="text" name="nombre" onChange={handleChange} required />

        <label>Descripcion</label>
        <input type="text" name="descripcion" onChange={handleChange} required />

        <label>Precio</label>
        <input type="number" name="precio" onChange={handleChange} required />

        <label>Tipo de plato</label>
        <select name="tipoplato" onChange={handleChange}>
          <option value="Matutina">Plato </option>
          <option value="Vespertina">Postre </option>
          <option value="Nocturna">Bebidas </option>
        </select>

        <label>Estado</label>
        <select name="estado" onChange={handleChange}>
          <option value={true}>Disponible</option>
          <option value={false}>No Disponible</option>
        </select>

        <div className="form-buttons">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/menu")}
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
