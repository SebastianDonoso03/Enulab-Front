import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getAllRestaurants,
  updateRestaurant,
  deleteRestaurant,
} from "../../services/restaurantServices";
import { Modal, Button } from "react-bootstrap";
import "../../styles/Restaurantes.css";

const Restaurantes = () => {
  const [restaurantes, setRestaurantes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedRestaurante, setSelectedRestaurante] = useState(null);
  const [formData, setFormData] = useState({ name: "", ubicacion: "", objetivos: "", logo: "" });

  // Obtener todos los restaurantes al cargar la página
  useEffect(() => {
    fetchRestaurantes();
  }, []);

  const fetchRestaurantes = async () => {
    try {
      const data = await getAllRestaurants();
      setRestaurantes(data);
    } catch (error) {
      console.error("Error al obtener restaurantes:", error);
    }
  };

  const handleUpdateClick = (restaurante) => {
    setSelectedRestaurante(restaurante);
    setFormData({
      name: restaurante.name,
      ubicacion: restaurante.ubicacion,
      objetivos: restaurante.objetivos,
      logo: restaurante.logo,
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
        fetchRestaurantes(); // Actualizar la lista después de eliminar
      } catch (error) {
        console.error("Error al eliminar restaurante:", error);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSaveChanges = async () => {
    try {
      await updateRestaurant(selectedRestaurante.id, formData);
      fetchRestaurantes(); // Actualizar la lista después de actualizar
      handleCloseModal();
    } catch (error) {
      console.error("Error al actualizar restaurante:", error);
    }
  };

  return (
    <div className="restaurantes-container min-vh-100 w-100">
      <h2 className="restaurantes-title">Mis restaurantes</h2>

      <div className="d-flex justify-content-end">
        <Link to="/crear-restaurantes" className="btn btn-primary">
          Agregar restaurante +
        </Link>
      </div>

      <div className="restaurantes-grid">
        {restaurantes.map((rest) => (
          <div key={rest.id} className="restaurante-card">
            <div className="restaurante-info">
              <img
                src={rest.logo || require("../../images/logo.png")}
                alt="Logo"
                className="restaurante-logo"
              />
              <h3>{rest.name}</h3>
              <p>{rest.ubicacion}</p>
              <p>{rest.objetivos}</p>
              <div className="d-flex gap-2">
                <button
                  className="btn btn-sm btn-info"
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
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
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
              <label className="form-label">Descripción</label>
              <textarea
                className="form-control"
                name="objetivos"
                value={formData.objetivos}
                onChange={handleInputChange}
              ></textarea>
            </div>
            <div className="mb-3">
              <label className="form-label">Logo (URL)</label>
              <input
                type="text"
                className="form-control"
                name="logo"
                value={formData.logo}
                onChange={handleInputChange}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Restaurantes;
