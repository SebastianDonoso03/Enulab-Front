import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import {
  getInventoryByRestaurant,
  updateInventory,
  deleteInventory,
} from "../../services/inventory.Services";
import 'bootstrap/dist/css/bootstrap.min.css';
const Inventario = () => {
  const restaurantId = localStorage.getItem("selectedRestaurantId");

  const [showModal, setShowModal] = useState(false);
  const [selectedProducto, setSelectedProducto] = useState(null);
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const inventoryData = await getInventoryByRestaurant(restaurantId);
        setProductos(inventoryData);
      } catch (error) {
        console.error("Error al cargar el inventario:", error);
      }
    };
    fetchInventory();
  }, [restaurantId]);

  const handleUpdateClick = (producto) => {
    setSelectedProducto(producto);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProducto(null);
  };

  const handleSaveChanges = async () => {
    if (selectedProducto) {
      try {
        await updateInventory(
          restaurantId,
          selectedProducto.id,
          selectedProducto
        );
        setShowModal(false);
        const updatedInventory = await getInventoryByRestaurant(restaurantId);
        setProductos(updatedInventory);
      } catch (error) {
        console.error("Error al guardar los cambios:", error);
      }
    }
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este producto?")) {
      try {
        await deleteInventory(restaurantId, id);
        setProductos(productos.filter((prod) => prod.id !== id));
      } catch (error) {
        console.error("Error al eliminar el producto:", error);
      }
    }
  };

  return (
    <div className="container mt-4 text-light" style={{ backgroundColor: '#121212', padding: '20px', borderRadius: '10px' }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-gold">Inventario</h2>
        <Link to="/Inventario/nuevo" className="btn btn-primary btn-lg">
          Agregar producto +
        </Link>
      </div>

      <div className="table-responsive">
        <table className="table table-dark table-hover text-center">
          <thead>
            <tr className="text-warning">
              <th>Nombre</th>
              <th>Cantidad</th>
              <th>Categoría</th>
              <th>Descripción</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((prod) => (
              <tr key={prod.id}>
                <td>{prod.nombreproductos}</td>
                <td>{prod.cantidad}</td>
                <td>{prod.categoria}</td>
                <td>{prod.descripcion}</td>
                <td className="d-flex justify-content-start">
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleUpdateClick(prod)}
                  >
                    <i className="bi bi-arrow-repeat"></i> Actualizar
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDeleteClick(prod.id)}
                  >
                    <i className="bi bi-trash"></i> Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Actualizar Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label className="form-label">Nombre del Producto</label>
              <input
                type="text"
                className="form-control"
                value={selectedProducto?.nombreproductos || ""}
                onChange={(e) =>
                  setSelectedProducto({
                    ...selectedProducto,
                    nombreproductos: e.target.value,
                  })
                }
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Cantidad</label>
              <input
                type="text"
                className="form-control"
                value={selectedProducto?.cantidad || ""}
                onChange={(e) =>
                  setSelectedProducto({
                    ...selectedProducto,
                    cantidad: e.target.value,
                  })
                }
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Categoría</label>
              <input
                type="text"
                className="form-control"
                value={selectedProducto?.categoria || ""}
                onChange={(e) =>
                  setSelectedProducto({
                    ...selectedProducto,
                    categoria: e.target.value,
                  })
                }
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Descripción</label>
              <textarea
                className="form-control"
                value={selectedProducto?.descripcion || ""}
                onChange={(e) =>
                  setSelectedProducto({
                    ...selectedProducto,
                    descripcion: e.target.value,
                  })
                }
              ></textarea>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button  onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button onClick={handleSaveChanges}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </div>

  );
};

export default Inventario;