import React, { useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { createRestaurant } from "../../services/restaurantServices"; // Importar el servicio
import "../../styles/Restaurantes.css"; 

const CrearRestaurante = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    ubicacion: "",
    objetivos: "",
    descripcion: "",
    logo: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createRestaurant(formData); // Ya incluye la verificación del user_id
      console.log("Restaurante creado exitosamente");
      navigate("/inicio"); // Redirigir a la lista de restaurantes
    } catch (error) {
      console.error("Error al crear el restaurante:", error.message);
      alert(error.message); // Mostrar el error al usuario
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
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="mb-3">
              <label className="form-label">Nombre del Restaurante</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={formData.name}
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Descripción del Negocio</label>
              <textarea
                className="form-control"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="mb-3">
              <label className="form-label">Logo (Imagen)</label>
              <input
                type="file"
                className="form-control"
                name="logo"
                accept="image/*"
                onChange={handleChange} // Capturar el archivo
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