import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createSupplier } from "../../services/supplierServices"


const CrearProveedor = () => {

  const navigate = useNavigate();
  const [restaurantId, setRestaurantId] = useState(null);

  useEffect(() => {
    // Recuperar el ID del restaurante desde localStorage
    const storedRestaurantId = localStorage.getItem("selectedRestaurantId");

    // Mostrar el valor en consola
    console.log("ID del restaurante en localStorage:", storedRestaurantId);

    if (storedRestaurantId) {
      setRestaurantId(storedRestaurantId);
    } else {
      console.error("No se encontró el restaurantId en localStorage.");
      navigate("/restaurantes"); // Redirigir si no hay un restaurante seleccionado
    }
  }, [navigate]);

  const [formData, setFormData] = useState({
    nameSupploer: "",
    numContact: "",
    email: "",
    direction: "",
    city: "",
    country: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!restaurantId) {
      console.error("No se puede crear proveedores sin restaurantId.");
      return
    }
    try {
      const createdSupplier = await createSupplier(restaurantId, formData);
      console.log("Empleado creado:", createdSupplier);
      navigate("/Proveedores");
    } catch (error) {
      console.error("Error al crear el empleado:", error);
    }



  };

  return (
    <div className="employee-container">
      <h2 className="employee-header">Creación de proveedor</h2>
      <form className="employee-form" onSubmit={handleSubmit}>
        <label>Nombre del proveedor</label>
        <input type="text" name="nameSupplier" onChange={handleChange} required />

        <label>Número de contacto</label>
        <input type="text" name="numContact" onChange={handleChange} required />

        <label>Email</label>
        <input type="text" name="email" onChange={handleChange} required />

        <label>Direccion</label>
        <input type="text" name="direction" onChange={handleChange} required />

        <label>Ciudad</label>
        <input type="text" name="city" onChange={handleChange} required />

        <label>Provincia</label>
        <input type="text" name="country" onChange={handleChange} required />


        <div className="form-buttons">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/Proveedores")}
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

export default CrearProveedor;


