import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createRestaurant } from "../../services/restaurantServices"; // Importar el servicio
import "../../styles/Restaurantes.css"; 

const CrearRestaurante = () => {
  const navigate = useNavigate(); // Para redirigir después de crear el restaurante
  const [formData, setFormData] = useState({
    name: "",
    ubicacion: "",
    objetivos: "",
    descripcion: "",
    logo: "", // Ahora el logo es un texto (por ejemplo, una URL)
  });

  // Manejar el cambio de los campos del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Enviar el formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createRestaurant(formData); // Llamada al servicio
      console.log("Restaurante creado exitosamente");
      navigate("/restaurantes"); // Redirigir después de la creación
    } catch (error) {
      console.error("Error al crear el restaurante:", error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">
            <i className="bi bi-plus-circle me-2"></i>
            Crear Restaurante
          </h4>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Nombre del Restaurante</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Ubicación</label>
              <input
                type="text"
                className="form-control"
                name="ubicacion"
                value={formData.ubicacion}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Objetivos</label>
              <input
                type="text"
                className="form-control"
                name="objetivos"
                value={formData.objetivos}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Descripción del Negocio</label>
              <textarea
                className="form-control"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleInputChange}
              ></textarea>
            </div>
            <div className="mb-3">
              <label className="form-label">Logo (URL o texto)</label>
              <input
                type="text"
                className="form-control"
                name="logo"
                value={formData.logo}
                onChange={handleInputChange}
                placeholder="Ej: https://mi-logo.com/logo.png"
              />
            </div>
            <div className="d-flex justify-content-end">
              <Link to="/restaurantes" className="btn btn-secondary me-2">
                Cancelar
              </Link>
              <button type="submit" className="btn btn-primary">
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CrearRestaurante;
