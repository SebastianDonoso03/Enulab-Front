import React, { useState, useEffect } from "react";
import "../../styles/Repertorio.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
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
    localStorage.setItem("selectedMenuId", id);
    navigate(`/Platos`);
  };

  return (
    <div className="restaurantes-container min-vh-100 w-100">
      <h2 className="restaurantes-title text-center">Menús Disponibles</h2>

      <div className="d-flex justify-content-center mb-4">
        <button className="btn btn-primary btn-lg" onClick={() => navigate("/CrearMenu")}>
          Agregar Menú +
        </button>
      </div>

      <div className="restaurantes-grid">
        {menus.length === 0 ? (
          <p className="text-center">No tienes menús creados. ¡Agrega uno!</p>
        ) : (
          menus.map((menu) => (
            <div key={menu.id} className="restaurante-card">
              <div className="restaurante-info">
                <h3>{menu.name}</h3>
                <p>{menu.description}</p>
                <div className="d-flex gap-2 justify-content-center">
                  <button
                    className="btn btn-sm btn-warning"
                    onClick={() => handleShowModal(menu)}
                  >
                    <i className="bi bi-arrow-repeat"></i> Actualizar
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(menu.id)}
                  >
                    <i className="bi bi-trash"></i> Eliminar
                  </button>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => handleManage(menu.id)}
                  >
                    <i className="bi bi-people"></i> Gestionar
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            <i className="bi bi-pencil-square me-2"></i>
            Actualizar Menú
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label className="form-label">Nombre del Menú</label>
              <input
                type="text"
                className="form-control"
                value={selectedMenu?.name || ""}
                onChange={(e) => setSelectedMenu({ ...selectedMenu, name: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Descripción</label>
              <textarea
                className="form-control"
                value={selectedMenu?.description || ""}
                onChange={(e) => setSelectedMenu({ ...selectedMenu, description: e.target.value })}
              ></textarea>
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

export default Repertorio;