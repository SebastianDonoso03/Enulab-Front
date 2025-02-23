import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createSupplier } from "../../services/supplierServices";
import "bootstrap/dist/css/bootstrap.min.css";
import CrearProveedores from "../../styles/CrearProveedores.css"

const CrearProveedor = () => {
  const navigate = useNavigate();
  const [restaurantId, setRestaurantId] = useState(null);
  const ciudadesEcuador = [
    "Quito", "Guayaquil", "Cuenca", "Santo Domingo", "Machala", "Manta", "Portoviejo", "Loja", "Ambato", "Esmeraldas"
  ];
  
  const provinciasEcuador = [
    "Azuay", "Bolívar", "Cañar", "Carchi", "Chimborazo", "Cotopaxi", "El Oro", "Esmeraldas", "Galápagos", "Guayas",
    "Imbabura", "Loja", "Los Ríos", "Manabí", "Morona Santiago", "Napo", "Orellana", "Pastaza", "Pichincha", "Santa Elena",
    "Santo Domingo de los Tsáchilas", "Sucumbíos", "Tungurahua", "Zamora Chinchipe"
  ];

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
    <div className="crear-proveedor-container">
      <div className="crear-proveedor-content">
        <div className="crear-proveedor-card">
          <h2 className="text-center mb-4">Crear Proveedor</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input type="text" className="form-control crear-proveedor-input" name="namesupplier" value={formData.namesupplier} onChange={handleChange} placeholder="Nombre del proveedor" required />
            </div>
            <div className="mb-3">
              <input type="number" className="form-control crear-proveedor-input" name="numcontact" value={formData.numcontact} onChange={handleChange} placeholder="Número de contacto" required />
            </div>
            <div className="mb-3">
              <input type="email" className="form-control crear-proveedor-input" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
            </div>
            <div className="mb-3">
              <input type="text" className="form-control crear-proveedor-input" name="direction" value={formData.direction} onChange={handleChange} placeholder="Dirección" required />
            </div>
            <div className="mb-3">
              <select className="form-control crear-proveedor-input" name="city" value={formData.city} onChange={handleChange} required>
                <option value="">Seleccione una ciudad</option>
                {ciudadesEcuador.map((ciudad, index) => (
                  <option key={index} value={ciudad}>{ciudad}</option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <select className="form-control crear-proveedor-input" name="country" value={formData.country} onChange={handleChange} required>
                <option value="">Seleccione una provincia</option>
                {provinciasEcuador.map((provincia, index) => (
                  <option key={index} value={provincia}>{provincia}</option>
                ))}
              </select>
            </div>
            <div className="d-flex justify-content-between">
              <button type="submit" className="btn btn-warning text-dark">Guardar Proveedor</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CrearProveedor;
