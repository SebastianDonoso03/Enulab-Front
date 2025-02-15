import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createInventory } from "../../services/inventory.Services";
import "bootstrap/dist/css/bootstrap.min.css";

const CrearInventario = () => {
  const navigate = useNavigate();
  const [restaurantId, setRestaurantId] = useState(null);
  const [formData, setFormData] = useState({
    nombreproductos: "",
    cantidad: "",
    categoria: "",
    descripcion: "",
  });

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "cantidad" ? (value ? parseInt(value, 10) : "") : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!restaurantId) {
      alert("Error: No se ha seleccionado un restaurante.");
      return;
    }

    try {
      const createdInventory = await createInventory(restaurantId, formData);
      console.log("Inventario creado:", createdInventory);
      navigate("/Inventario");
    } catch (error) {
      console.error("Error al crear el inventario:", error.response?.data || error.message);
      alert("Hubo un error al crear el inventario. Por favor, inténtalo de nuevo.");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100" style={{ color: "gold" }}>
      <div className="card p-4 shadow-lg" style={{ maxWidth: "600px", width: "100%", borderRadius: "15px", backgroundColor: "#222", border: "2px solid gold" }}>
        <h2 className="text-center mb-4" style={{ color: "gold" }}>Crear Inventario</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-bold text-light">Nombre del Producto</label>
            <input type="text" className="form-control" name="nombreproductos" value={formData.nombreproductos} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold text-light">Cantidad</label>
            <input type="number" className="form-control  " name="cantidad" value={formData.cantidad} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold text-light">Categoría</label>
            <select className="form-select " name="categoria" value={formData.categoria} onChange={handleChange} required>
              <option value="">Seleccione una categoría</option>
              <option value="Lácteos y derivados">Grupo 1: Lácteos y derivados</option>
              <option value="Carne, huevos y pescado">Grupo 2: Carne, huevos y pescado</option>
              <option value="Tubérculos, legumbres y frutos secos">Grupo 3: Tubérculos, legumbres y frutos secos</option>
              <option value="Verduras y hortalizas">Grupo 4: Verduras y hortalizas</option>
              <option value="Frutas">Grupo 5: Frutas</option>
              <option value="Pan, pasta, cereales y azúcar">Grupo 6: Pan, pasta, cereales y azúcar</option>
              <option value="Grasas, aceites y mantequillas">Grupo 7: Grasas, aceites y mantequillas</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold text-light">Descripción</label>
            <textarea className="form-control" name="descripcion" value={formData.descripcion} onChange={handleChange} required></textarea>
          </div>
          <div className="d-flex justify-content-between">
            <button type="button"  className="btn btn-warning text-dark" onClick={() => navigate("/Inventario")}>Atrás</button>
            <button type="submit"  className="btn btn-warning text-dark">Guardar Producto</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CrearInventario;
