import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPlato } from "../../services/dishService";
import "bootstrap/dist/css/bootstrap.min.css";

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

    if (menuId) {
      try {
        await createPlato(menuId, formData);
        console.log("Plato agregado:", formData);
        navigate("/Platos");
      } catch (error) {
        console.error("Error al agregar el plato:", error);
      }
    } else {
      console.error("No se encontró el ID del menú.");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100" style={{ color: "gold" }}>
      <div className="card p-4 shadow-lg" style={{ maxWidth: "500px", width: "100%", borderRadius: "15px", backgroundColor: "#222", border: "2px solid gold" }}>
        <h2 className="text-center mb-4" style={{ color: "gold" }}>Creación de Plato</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Descripción</label>
            <input type="text" className="form-control" name="description" value={formData.description} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Precio</label>
            <input type="number" className="form-control" name="price" value={formData.price} onChange={handleChange} required />
          </div>
          <div className="d-flex justify-content-between">
            <button type="button" className="btn btn-secondary" onClick={() => navigate("/Platos")}>Atrás</button>
            <button type="submit" className="btn btn-warning text-dark">Continuar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CrearPlato;
