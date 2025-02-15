import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createSupplier } from "../../services/supplierServices";
import "bootstrap/dist/css/bootstrap.min.css";

const CrearProveedor = () => {
  const navigate = useNavigate();
  const [restaurantId, setRestaurantId] = useState(null);

  useEffect(() => {
    const storedRestaurantId = localStorage.getItem("selectedRestaurantId");
    console.log("ID del restaurante en localStorage:", storedRestaurantId);

    if (storedRestaurantId) {
      setRestaurantId(storedRestaurantId);
    } else {
      console.error("No se encontró el restaurantId en localStorage.");
      navigate("/restaurantes");
    }
  }, [navigate]);

  const [formData, setFormData] = useState({
    namesupplier: "",
    numcontact: "",
    email: "",
    direction: "",
    city: "",
    country: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!restaurantId) {
      console.error("No se puede crear proveedores sin restaurantId.");
      return;
    }
    try {
      const createdSupplier = await createSupplier(restaurantId, formData);
      console.log("Proveedor creado:", createdSupplier);
      navigate("/Proveedores");
    } catch (error) {
      console.error("Error al crear el proveedor:", error);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100" style={{  color: "gold" }}>
      <div className="card p-4 shadow-lg" style={{ maxWidth: "500px", width: "100%", borderRadius: "15px", backgroundColor: "#222", border: "2px solid gold" }}>
        <h2 className="text-center mb-4" style={{ color: "gold" }}>Creación de proveedor</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nombre del proveedor</label>
            <input type="text" className="form-control" name="namesupplier" onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Número de contacto</label>
            <input type="text" className="form-control" name="numcontact" onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" name="email" onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Dirección</label>
            <input type="text" className="form-control" name="direction" onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Ciudad</label>
            <input type="text" className="form-control" name="city" onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Provincia</label>
            <input type="text" className="form-control" name="country" onChange={handleChange} required />
          </div>
          <div className="d-flex justify-content-between">
            <button type="button"  className="btn btn-warning text-dark" onClick={() => navigate("/Proveedores")}>Atrás</button>
            <button type="submit"    className="btn btn-warning text-dark">Continuar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CrearProveedor;
