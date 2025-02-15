import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";

const Postres = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedPostre, setSelectedPostre] = useState(null);

  const postres = [
    {
      id: 1,
      nombre: "Helado",
      descripcion: "Helado de vainilla",
      precio: 3.0,
    },
    {
      id: 2,
      nombre: "Tarta de queso",
      descripcion: "Tarta de queso con frutas",
      precio: 5.0,
    },
    {
      id: 3,
      nombre: "Brownie",
      descripcion: "Brownie con chocolate",
      precio: 4.0,
    },
    {
      id: 4,
      nombre: "Gelatina",
      descripcion: "Gelatina de frutas",
      precio: 2.5,
    },
  ];
  const handleUpdateClick = (postre) => {
    setSelectedPostre(postre);
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPostre(null);
  };
  const handleDeleteClick = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este postre?")) {
      console.log("Postre eliminado:", id);
    }
  };

  return (
    <div className="container">
      <h1>Postres</h1>
      <Link to="/Crear-Postre" className="btn btn-primary mb-3">
        <i className="bi bi-plus-circle me-2"></i>
        Crear Postre +
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
          {postres.map((postre) => (
            <tr key={postre.id}>
              <td>{postre.nombre}</td>
              <td>{postre.descripcion}</td>
              <td>{postre.precio}</td>
              <td>
                <button
                  className="btn btn-sm me-2"
                  onClick={() => handleUpdateClick(postre)}
                >
                  <i className="bi bi-pencil"></i> Actualizar
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDeleteClick(postre.id)}
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
            Actualizar Postre
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input
                type="text"
                className="form-control"
                defaultValue={selectedPostre ? selectedPostre.nombre : ""}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Descripción</label>
              <input
                type="text"
                className="form-control"
                defaultValue={selectedPostre ? selectedPostre.descripcion : ""}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input
                type="number"
                className="form-control"
                defaultValue={selectedPostre ? selectedPostre.precio : ""}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button  className="btn btn-warning text-dark" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button  className="btn btn-warning text-dark"onClick={handleCloseModal}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default Postres;
