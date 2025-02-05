import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createRestaurant } from "../../services/restaurantServices";

const CrearRestaurante = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    ubicacion: "",
    objetivos: "",
    descripcion: "",
    logo: null,
  });

  // Obtener el user_id del localStorage
  const user_id = localStorage.getItem('user_id');
  const parsedUserId = parseInt(user_id, 10); // Convertir a número

  // Verificar si el usuario está autenticado
  useEffect(() => {
    if (!user_id || isNaN(parsedUserId)) {
      alert("Debes iniciar sesión para crear un restaurante.");
      navigate("/login"); // Redirigir al login si no está autenticado
    }
  }, [user_id, parsedUserId, navigate]);

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
      await createRestaurant(formData); // Enviar los datos del restaurante
      navigate("/restaurantes");
    } catch (error) {
      console.error("Error al crear el restaurante:", error);
      alert("Error al crear el restaurante. Por favor, inténtalo de nuevo.");
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
              <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Ubicación</label>
              <input type="text" className="form-control" name="ubicacion" value={formData.ubicacion} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Objetivos</label>
              <input type="text" className="form-control" name="objetivos" value={formData.objetivos} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Descripción del Negocio</label>
              <textarea className="form-control" name="descripcion" value={formData.descripcion} onChange={handleChange} required></textarea>
            </div>
            <div className="mb-3">
              <label className="form-label">Logo del Restaurante</label>
              <input type="file" className="form-control" name="logo" onChange={handleChange} />
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