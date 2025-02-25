import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import "../../styles/Restaurantess.css";
import { getMenusByRestaurant, updateMenu, deleteMenu } from "../../services/menuServices";
import Swal from "sweetalert2"; // Importamos SweetAlert2

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
      // Mensaje de confirmación antes de guardar los cambios
      Swal.fire({
        title: '¿Estás seguro?',
        text: "Los cambios realizados se guardarán.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#f39c12',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, guardar',
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await updateMenu(restaurantId, selectedMenu.id, selectedMenu);
            setShowModal(false);
            const updatedMenus = await getMenusByRestaurant(restaurantId);
            setMenus(updatedMenus);

            // Alerta de éxito en la actualización
            Swal.fire({
              icon: 'success',
              title: 'Menú actualizado',
              text: 'El menú se actualizó correctamente',
              confirmButtonColor: '#f39c12',
            });
          } catch (error) {
            console.error("Error al guardar los cambios:", error);
            // Alerta de error
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Hubo un error al actualizar el menú',
              confirmButtonColor: '#f39c12',
            });
          }
        }
      });
    }
  };

  const handleDelete = async (id) => {
    // Usamos Swal en lugar de window.confirm
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Este menú será eliminado de forma permanente.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#f39c12',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteMenu(restaurantId, id);
          setMenus(menus.filter((menu) => menu.id !== id));
          // Alerta de éxito en la eliminación
          Swal.fire({
            icon: 'success',
            title: 'Menú eliminado',
            text: 'El menú se eliminó correctamente',
            confirmButtonColor: '#f39c12',
          });
        } catch (error) {
          console.error("Error al eliminar el menú", error);
          // Alerta de error en la eliminación
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un error al eliminar el menú',
            confirmButtonColor: '#f39c12',
          });
        }
      }
    });
  };

  const handleManage = (id) => {
    localStorage.setItem("selectedMenuId", id);
    navigate(`/Platos`);
  };

  return (
    <div className="restaurantes-container min-vh-100 w-100">
      <h2 className="repertorio-titulo ">Menús Disponibles</h2>

      <div className="d-flex justify-content-center mb-4">
        <button className="btn btn-warning text-dark" onClick={() => navigate("/crear-menu")}>
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
          <Button
            className="btn btn-warning text-dark"
            onClick={handleCloseModal}
            style={{
              backgroundColor: "#f39c12",
              borderColor: "#f39c12",
              color: "#000", // Color del texto
            }}
          >
            Cancelar
          </Button>
          <Button
            className="btn btn-warning text-dark"
            onClick={handleSaveChanges}
            style={{
              backgroundColor: "#f39c12",
              borderColor: "#f39c12",
              color: "#000", // Color del texto
            }}
          >
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Repertorio;
