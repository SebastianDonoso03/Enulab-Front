import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import { getPlatosByMenu, updatePlato, deletePlato } from "../../services/dishService"; // Import your services

const Platos = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedPlato, setSelectedPlato] = useState(null);
  const [platos, setPlatos] = useState([]);
  const menuId = localStorage.getItem("selectedMenuId");

  useEffect(() => {
    const fetchPlatos = async () => {
      if (menuId) {
        try {
          const platosData = await getPlatosByMenu(menuId);
          setPlatos(platosData);
        } catch (error) {
          console.error("Error al cargar los platos:", error);
        }
      }
    };

    fetchPlatos();
  }, [menuId]);

  const handleUpdateClick = (plato) => {
    setSelectedPlato(plato);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPlato(null);
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este plato?")) {
      try {
        await deletePlato(menuId,id); // Use the deletePlato service
        setPlatos(platos.filter((plato) => plato.id !== id)); // Update the state after deletion
      } catch (error) {
        console.error("Error al eliminar el plato:", error);
      }
    }
  };

  const handleSaveChanges = async () => {
    if (selectedPlato) {
      try {
        await updatePlato(menuId, selectedPlato.id, selectedPlato); // Update the dish using the service
        setShowModal(false);
        const updatedPlatos = await getPlatosByMenu(menuId); // Fetch the updated list of dishes
        setPlatos(updatedPlatos);
      } catch (error) {
        console.error("Error al guardar los cambios:", error);
      }
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
              <td>{plato.name}</td>
              <td>{plato.description}</td>
              <td>{plato.price}</td>
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

      {/* Modal for updating dish */}
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
                value={selectedPlato ? selectedPlato.name : ""}
                onChange={(e) =>
                  setSelectedPlato({
                    ...selectedPlato,
                    name: e.target.value,
                  })
                }
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Descripción</label>
              <input
                type="text"
                className="form-control"
                value={selectedPlato ? selectedPlato.description : ""}
                onChange={(e) =>
                  setSelectedPlato({
                    ...selectedPlato,
                    descripction: e.target.value,
                  })
                }
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Precio</label>
              <input
                type="number"
                className="form-control"
                value={selectedPlato ? selectedPlato.price : ""}
                onChange={(e) =>
                  setSelectedPlato({
                    ...selectedPlato,
                    price: e.target.value,
                  })
                }
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

export default Platos;
