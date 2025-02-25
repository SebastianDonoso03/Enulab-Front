import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createInventory } from "../../services/inventory.Services";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import CrearInventarios from "../../styles/CrearInventarios.css"; // Importamos el archivo CSS

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
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se ha seleccionado un restaurante.",
        confirmButtonColor: "#d33",
        confirmButtonText: "Cerrar"
      });
      return;
    }

    try {
      const createdInventory = await createInventory(restaurantId, formData);
      console.log("Inventario creado:", createdInventory);

      // Alerta de éxito
      Swal.fire({
        icon: "success",
        title: "Producto Agregado",
        text: "El producto se ha registrado correctamente en el inventario.",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Aceptar"
      }).then(() => {
        navigate("/Inventario");
      });

    } catch (error) {
      console.error("Error al crear el inventario:", error.response?.data || error.message);

      // Alerta de error
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un problema al crear el producto en el inventario. Inténtelo de nuevo.",
        confirmButtonColor: "#d33",
        confirmButtonText: "Cerrar"
      });
    }
  };

  return (
    <div className="crear-inventario-container">
      <div className="crear-inventario-card">
        <h2 className="text-center mb-4">Crear Inventario</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input type="text" className="form-control" name="nombreproductos" value={formData.nombreproductos} onChange={handleChange} placeholder="Nombre del Producto" required />
          </div>
          <div className="form-group">
            <input type="number" className="form-control" name="cantidad" value={formData.cantidad} onChange={handleChange} placeholder="Cantidad" required />
          </div>
          <div className="form-group">
            <select className="form-control" name="categoria" value={formData.categoria} onChange={handleChange} required>
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
          <div className="form-group">
            <textarea className="form-control" name="descripcion" value={formData.descripcion} onChange={handleChange} placeholder="Descripción" required></textarea>
          </div>
          <div className="form-actions d-flex justify-content-center">
            <button type="submit" className="btn btn-warning">Guardar Producto</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CrearInventario;