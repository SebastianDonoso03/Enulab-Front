import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";

const Platos = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedPlato, setSelectedPlato] = useState(null);

  const platos = [
    {
      id: 1,
      nombre: "Hamburguesa",
      descripcion: "Hamburguesa con queso",
      precio: 5.0,
    },
    {
      id: 2,
      nombre: "Pizza",
      descripcion: "Pizza con pepperoni",
      precio: 8.0,
    },
    {
      id: 3,
      nombre: "Ensalada",
      descripcion: "Ensalada de pollo",
      precio: 6.0,
    },
    {
      id: 4,
      nombre: "Sushi",
      descripcion: "Sushi de camarón",
      precio: 10.0,
    },
  ];
  const handleUpdateClick = (plato) => {
    setSelectedPlato(plato);
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPlato(null);
  };
  const handleDeleteClick = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este plato?")) {
      console.log("Plato eliminado:", id);
    }
  };

  return (
    <div className="container">
      <h1 className="text-center">Platos</h1>
      <Link to="/Crear-Plato" className="btn btn-primary mb-3">
        <i className="bi bi-plus-circle me-2"></i>
        Crear Plato +
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
          {platos.map((plato) => (
            <tr key={plato.id}>
              <td>{plato.nombre}</td>
              <td>{plato.descripcion}</td>
              <td>{plato.precio}</td>
              <td>
                <button
                  className="btn btn-sm me-2"
                  onClick={() => handleUpdateClick(plato)}
                >
                  <i className="bi bi-pencil"></i> Actualizar
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDeleteClick(plato.id)}
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
            Actualizar Bebida
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input
                type="text"
                className="form-control"
                defaultValue={selectedPlato ? selectedPlato.nombre : ""}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Descripción</label>
              <input
                type="text"
                className="form-control"
                defaultValue={selectedPlato ? selectedPlato.descripcion : ""}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Precio</label>
              <input
                type="number"
                className="form-control"
                defaultValue={selectedPlato ? selectedPlato.precio : ""}
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

export default Platos;