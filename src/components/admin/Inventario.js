import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import {getInventoryByRestaurant,updateInventory,deleteInventory} from "../../services/inventory.Services"
const Inventario = () => {

   // Recuperamos el `restaurantId` desde el localStorage
   const restaurantId = localStorage.getItem("selectedRestaurantId");

  const [showModal, setShowModal] = useState(false); 
  const [selectedProducto, setSelectedProducto] = useState(null); 
  const [productos, setProductos] = useState([]);

    // Función para cargar los inventario al inicio
    useEffect(() => {
      const fetchInventory = async () => {
        try {
          const inventoryData = await getInventoryByRestaurant(restaurantId);
          setProductos(inventoryData);
        } catch (error) {
          console.error("Error al cargar los inventario:", error);
        }
      };
      fetchInventory();
    }, [restaurantId]); // Este efecto se dispara cada vez que cambia el `restaurantId`
  
  const handleUpdateClick = (producto) => {
    setSelectedProducto(producto);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProducto(null);
  };

    // Función para guardar los cambios después de actualizar
    const handleSaveChanges = async () => {
      if (selectedProducto) {
        try {
          await updateInventory(restaurantId, selectedProducto.id, selectedProducto); 
          setShowModal(false);
          // Actualizar la lista de empleados después de la actualización
          const updatedInventory = await getInventoryByRestaurant(restaurantId);
          setProductos(updatedInventory);
        } catch (error) {
          console.error("Error al guardar los cambios:", error);
        }
      }
    };
  
  const handleDeleteClick = async (id) => {
     if (window.confirm("¿Estás seguro de que deseas eliminar este empleado?")) {
         try {
           await deleteInventory(restaurantId, id); 
           // Eliminar el empleado de la lista después de la eliminación
           const updatedInventory = productos.filter((emp) => emp.id !== id);
           setProductos(updatedInventory);
         } catch (error) {
           console.error("Error al eliminar el empleado:", error);
         }
       }
     };

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Inventario</h2>
        <Link to="/Inventario/nuevo" className="btn btn-primary">
          Agregar producto +
        </Link>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Cantidad</th>
            <th>Categoría</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.nombreproductos}</td>
              <td>{emp.cantidad}</td>
              <td>{emp.categoria}</td>
              <td>{emp.descripcion}</td>
              <td>
                <button
                  className="btn btn-sm me-2"
                  onClick={() => handleUpdateClick(emp)}
                >
                  <i className="bi bi-pencil"></i> Actualizar
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDeleteClick(emp.id)}
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
            Actualizar Producto
          </Modal.Title>
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
                  setSelectedProducto({ ...selectedProducto, nameproductos: e.target.value })
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
                  setSelectedProducto({ ...selectedProducto, cantidad: e.target.value })
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
                  setSelectedProducto({ ...selectedProducto, categoria: e.target.value })
                }
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Descripción</label>
              <textarea
                className="form-control"
                value={selectedProducto?.descripcion || ""}
                onChange={(e) =>
                  setSelectedProducto({ ...selectedProducto, descripcion: e.target.value })
                }
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

export default Inventario;
