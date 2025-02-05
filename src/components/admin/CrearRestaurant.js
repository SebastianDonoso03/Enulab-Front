import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createRestaurant } from "../../services/restaurantServices"; // Importar el servicio
import "../../styles/Restaurantes.css"; 

const CrearRestaurante = () => {
  const navigate = useNavigate(); // Para redirigir después de crear el restaurante

  // Estado del formulario
  const [formData, setFormData] = useState({
    name: "",
    ubicacion: "",
    objetivos: "",
    descripcion: "",
    logo: null, // Inicialmente null para el archivo
  });

  // Manejar cambios en los campos de texto
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Manejar la carga de archivos
  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Obtener el archivo seleccionado
    setFormData((prevState) => ({
      ...prevState,
      logo: file, // Guardar el archivo en el estado
    }));
  };

  // Enviar el formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData(); // Crear FormData para enviar archivos
    formDataToSend.append("name", formData.name);
    formDataToSend.append("ubicacion", formData.ubicacion);
    formDataToSend.append("objetivos", formData.objetivos);
    formDataToSend.append("descripcion", formData.descripcion);
    if (formData.logo) {
      formDataToSend.append("logo", formData.logo); // Agregar el archivo si existe
    }

    try {
      await createRestaurant(formDataToSend); // Enviar FormData al backend
      console.log("Restaurante creado exitosamente");
      navigate("/restaurantes"); // Redirigir a la lista de restaurantes
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
          <form onSubmit={handleSubmit} encType="multipart/form-data">
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
              <label className="form-label">Logo (Imagen)</label>
              <input
                type="file"
                className="form-control"
                name="logo"
                accept="image/*"
                onChange={handleFileChange} // Capturar el archivo
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