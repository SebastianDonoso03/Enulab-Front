import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../styles/Restaurantes.css";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { getRestaurantsByUser, deleteRestaurant, updateRestaurant } from '../../services/restaurantServices'; // Importa el servicio adecuado

const Restaurantes = () => {
  const navigate = useNavigate();
  const [restaurantes, setRestaurantes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedRestaurante, setSelectedRestaurante] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    ubicacion: "",
    objetivos: "",
    descripcion: "",
    logo: null, // Para el archivo del logo
  });

  useEffect(() => {
    fetchRestaurantes();
  }, []);

  const fetchRestaurantes = async () => {
    try {
      const userId = localStorage.getItem('user_id');
      if (userId) {
        const data = await getRestaurantsByUser(userId);
        setRestaurantes(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error("Error al obtener restaurantes:", error.message);
      setRestaurantes([]);  // Reset on error
    }
  };

  const handleGestionClick = (restaurante) => {
    localStorage.setItem("selectedRestaurantId", restaurante.id);
    navigate("/empleados");
  };

  const handleUpdateClick = (restaurante) => {
    setSelectedRestaurante(restaurante);
    setFormData({
      name: restaurante.name,
      ubicacion: restaurante.ubicacion,
      objetivos: restaurante.objetivos,
      descripcion: restaurante.descripcion,
      logo: null, // Limpiar logo
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedRestaurante(null);
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este restaurante?")) {
      try {
        await deleteRestaurant(id);
        fetchRestaurantes();  // Refresh the list
      } catch (error) {
        console.error("Error al eliminar el restaurante:", error);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, type, files, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("ubicacion", formData.ubicacion);
      formDataToSend.append("objetivos", formData.objetivos);
      formDataToSend.append("descripcion", formData.descripcion);
      if (formData.logo) formDataToSend.append("logo", formData.logo);

      await updateRestaurant(selectedRestaurante.id, formDataToSend);
      fetchRestaurantes();  // Refresh after update
      handleCloseModal();  // Close the modal
    } catch (error) {
      console.error("Error al actualizar el restaurante:", error);
    }
  };

  return (
    <div className="restaurantes-container min-vh-100 w-100">
      <h2 className="restaurantes-title text-center">Mis Restaurantes</h2>

      <div className="d-flex justify-content-center mb-4">
        <Link to="/crear-restaurantes"  className="btn btn-warning text-dark">
          Agregar Restaurante +
        </Link>
      </div>

      <div className="restaurantes-grid">
        {restaurantes.length === 0 ? (
          <p className="text-center">No tienes restaurantes creados. ¡Agrega uno!</p>
        ) : (
          restaurantes.map((rest) => (
            <div key={rest.id} className="restaurante-card">
              <div className="restaurante-info">
                <img
                  src={`http://localhost:4200/img/usuario/${rest.logo}`}  
                  alt="Logo"
                  className="restaurante-logo"
                />
                <h3>{rest.name}</h3>
                <p>{rest.ubicacion}</p>
                <div className="d-flex gap-2 justify-content-center">
                  <button
                    className="btn btn-sm btn-warning"
                    onClick={() => handleUpdateClick(rest)}
                  >
                    <i className="bi bi-arrow-repeat"></i> Actualizar
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDeleteClick(rest.id)}
                  >
                    <i className="bi bi-trash"></i> Eliminar
                  </button>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => handleGestionClick(rest)}
                  >
                    <i className="bi bi-people"></i> Gestión
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header  onHide={handleCloseModal}>
          <Modal.Title>
            <i className="bi bi-pencil-square me-2"></i>
            Actualizar Restaurante
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label className="form-label">Nombre del Restaurante</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
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
              <label className="form-label">Logo del Restaurante</label>
              <input
                type="file"
                className="form-control"
                name="logo"
                onChange={handleInputChange}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button  className="btn btn-warning text-dark" onClick={handleCloseModal} style={{
      backgroundColor: "#f39c12",
      borderColor: "#f39c12",
      color: "#000", // Color del texto
    }}>
            Cancelar
          </Button>
          <Button  className="btn btn-warning text-dark" onClick={handleSaveChanges} style={{
      backgroundColor: "#f39c12",
      borderColor: "#f39c12",
      color: "#000", // Color del texto
    }}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Restaurantes;
