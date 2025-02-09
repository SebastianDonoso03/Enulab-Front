import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap"; // Importa Modal y Button de react-bootstrap

const Menu = () => {
  const [showModal, setShowModal] = useState(false); // Estado para controlar la visibilidad del modal
  const [selectedPlato, setSelectedPlato] = useState(null); // Estado para almacenar el plato seleccionado

  const menu = [
    {
      id: 1,
      nombre: "Hamburguesa",
      descripcion: "Deliciosa hamburguesa con carne de res",
      precio: 10.99,
      porciones: 2,
      categoria: "Plato",
      disponibilidad: true,
    },
    {
      id: 2,
      nombre: "Pizza",
      descripcion: "Pizza con queso y pepperoni",
      precio: 12.99,
      porciones: 4,
      categoria: "Plato",
      disponibilidad: true,
    },
    {
      id: 3,
      nombre: "Ensalada",
      descripcion: "Ensalada fresca con lechuga, tomate y cebolla",
      precio: 8.99,
      porciones: 1,
      categoria: "Bebidas",
      disponibilidad: true,
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
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Menú</h2>
        <Link to="/Crearplato" className="btn btn-primary">
          Agregar plato +
        </Link>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Categoría</th>
            <th>Disponibilidad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {menu.map((plato) => (
            <tr key={plato.id}>
              <td>{plato.nombre}</td>
              <td>{plato.descripcion}</td>
              <td>{plato.precio}</td>
              <td>{plato.categoria}</td>
              <td>{plato.disponibilidad ? "Disponible" : "No disponible"}</td>
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
            Actualizar Plato
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input
                type="text"
                className="form-control"
                defaultValue={selectedPlato?.nombre || ""}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Descripcion</label>
              <input
                type="text"
                className="form-control"
                defaultValue={selectedPlato?.descripcion || ""}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Precio</label>
              <input
                type="number"
                className="form-control"
                defaultValue={selectedPlato?.precio || ""}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Disponibilidad</label>
              <select
                className="form-select"
                defaultValue={selectedPlato?.disponibilidad || ""}
              >
                <option value="true">Disponible</option>
                <option value="false">No disponible</option>
              </select> 
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Menu;
