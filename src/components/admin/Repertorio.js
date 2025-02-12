import React, { useState, useEffect } from "react";
import "../../styles/Repertorio.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";
import { getMenusByRestaurant, updateMenu, deleteMenu } from "../../services/menuServices";

const Repertorio = () => {
  const restaurantId = localStorage.getItem("selectedRestaurantId");
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const menusData = await getMenusByRestaurant(restaurantId);
        setMenus(menusData);
      } catch (error) {
        console.error("Error al cargar los menús:", error);
      }
    };
    fetchMenus();
  }, [restaurantId]);

  const handleShowModal = (menu) => {
    setSelectedMenu(menu);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedMenu(null);
  };

  const handleSaveChanges = async () => {
    if (selectedMenu) {
      try {
        await updateMenu(restaurantId, selectedMenu.id, selectedMenu);
        setShowModal(false);
        const updatedMenus = await getMenusByRestaurant(restaurantId);
        setMenus(updatedMenus);
      } catch (error) {
        console.error("Error al guardar los cambios:", error);
      }
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este menú?")) {
      try {
        await deleteMenu(restaurantId, id);
        setMenus(menus.filter((menu) => menu.id !== id));
      } catch (error) {
        console.error("Error al eliminar el menú", error);
      }
    }
  };

  const handleManage = (id) => {
    // Guardamos el id del menú seleccionado en localStorage
    localStorage.setItem("selectedMenuId", id);
    // Redirigimos a la página de gestión de platos
    navigate(`/Platos`);
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Menús Disponibles</h2>
        <button className="btn btn-warning" onClick={() => navigate("/CrearMenu")}>
          Agregar
        </button>
      </div>
      {menus.map((menu) => (
        <div className="menu-item d-flex mb-3" key={menu.id}>
          <div className="menu-description flex-grow-1">
            <h3>{menu.name}</h3>
            <p>{menu.description}</p>
          </div>
          <div className="menu-actions">
            <button className="btn btn-info mb-2" onClick={() => handleShowModal(menu)}>
              Actualizar
            </button>
            <button className="btn btn-danger mb-2" onClick={() => handleDelete(menu.id)}>
              Eliminar
            </button>
            {/* Botón "Gestionar" */}
            <button className="btn btn-secondary" onClick={() => handleManage(menu.id)}>
              Gestionar
            </button>
          </div>
        </div>
      ))}

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Actualizar Menú</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nombre del Menú</Form.Label>
              <Form.Control
                type="text"
                value={selectedMenu?.name || ""}
                onChange={(e) => setSelectedMenu({ ...selectedMenu, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={selectedMenu?.description || ""}
                onChange={(e) => setSelectedMenu({ ...selectedMenu, description: e.target.value })}
              />
            </Form.Group>
          </Form>
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

export default Repertorio;
