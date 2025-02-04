import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getAllRestaurants } from "../../services/restaurantServices"; 
import "../../styles/Restaurantes.css";
import "../../images/logo.png";
import { Modal, Button } from "react-bootstrap";

const Restaurantes = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedRestaurante, setSelectedRestaurante] = useState(null);
  const [restaurantes, setRestaurantes] = useState([
    {
      id: 1,
      nombre: "Restaurante 1",
      tipoComida: "Comida rápida",
    },
    {
      id: 2,
      nombre: "Restaurante 2",
      tipoComida: "Comida italiana",
    },
    {
      id: 3,
      nombre: "Restaurante 3",
      tipoComida: "Comida mexicana",
    },
    {
      id: 4,
      nombre: "Restaurante 4",
      tipoComida: "Comida japonesa",
    },
  ]);

  const handleUpdateClick = (restaurante) => {
    setSelectedRestaurante(restaurante);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedRestaurante(null);
  };

  const handleDeleteClick = (id) => {
    if (
      window.confirm("¿Estás seguro de que deseas eliminar este restaurante?")
    ) {
      const updatedRestaurantes = restaurantes.filter((rest) => rest.id !== id);
      setRestaurantes(updatedRestaurantes); 
      console.log("Restaurante eliminado:", id);
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
                src={require("../../images/logo.png")}
                alt="Logo"
                className="restaurante-logo"
              />
              <h3>{rest.nombre}</h3>
              <p>{rest.tipoComida}</p>
              <div className="d-flex gap-2">
                <button
                  className="btn btn-sm"
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
                defaultValue={selectedRestaurante?.nombre || ""}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Ubicación</label>
              <input type="text" className="form-control" />
            </div>
            <div className="mb-3">
              <label className="form-label">Objetivos</label>
              <input type="text" className="form-control" />
            </div>
            <div className="mb-3">
              <label className="form-label">Descripción del Negocio</label>
              <textarea className="form-control"></textarea>
            </div>
            <div className="mb-3">
              <label className="form-label">Logo del Restaurante</label>
              <input type="file" className="form-control" />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleCloseModal}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Restaurantes;