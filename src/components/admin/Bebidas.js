import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";

const Bebidas = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedBebida, setSelectedBebida] = useState(null);

  const bebidas = [
    {
      id: 1,
      nombre: "Coca Cola",
      descripcion: "Refresco",
      precio: 2.5,
    },
    {
      id: 2,
      nombre: "Pepsi",
      descripcion: "Refresco",
      precio: 2.0,
    },
    {
      id: 3,
      nombre: "Fanta",
      descripcion: "Refresco",
      precio: 2.0,
    },
    {
      id: 4,
      nombre: "Sprite",
      descripcion: "Refresco",
      precio: 2.0,
    },
  ];
  const handleUpdateClick = (bebida) => {
    setSelectedBebida(bebida);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedBebida(null);
  };

  const handleDeleteClick = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta bebida?")) {
      console.log("Bebida eliminado:", id);
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Bebidas</h1>
      <Link to="/Crear-Bebida" className="btn btn-primary mb-3">
        <i className="bi bi-plus-circle me-2"></i> Agregar Bebida +
      </Link>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {bebidas.map((bebida) => (
            <tr key={bebida.id}>
              <td>{bebida.nombre}</td>
              <td>{bebida.descripcion}</td>
              <td>{bebida.precio}</td>
              <td>
                <button
                  className="btn btn-sm me-2"
                  onClick={() => handleUpdateClick(bebida)}
                >
                  <i className="bi bi-pencil"></i> Actualizar
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDeleteClick(bebida.id)}
                >
                  <i className="bi bi-trash"></i> Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            <i className="bi bi-pencil-square me-2"></i>
            Actualizar Bebida +
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input
                type="text"
                className="form-control"
                defaultValue={selectedBebida ? selectedBebida.nombre : ""}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Descripción</label>
              <input
                type="text"
                className="form-control"
                defaultValue={selectedBebida ? selectedBebida.descripcion : ""}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input
                type="number"
                className="form-control"
                defaultValue={selectedBebida ? selectedBebida.precio : ""}
              />
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

export default Bebidas;
