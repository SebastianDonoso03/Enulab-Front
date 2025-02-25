import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import {
  getInventoryByRestaurant,
  updateInventory,
  deleteInventory,
} from "../../services/inventory.Services";
import Swal from "sweetalert2"; // Importa SweetAlert2
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
      Swal.fire({
        title: '¿Guardar cambios?',
        text: "Se actualizarán los datos del producto.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, actualizar',
        cancelButtonText: 'Cancelar',
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await updateInventory(restaurantId, selectedProducto.id, selectedProducto);
            
            // Obtener el inventario actualizado
            const updatedInventory = await getInventoryByRestaurant(restaurantId);
            setProductos(updatedInventory);
  
            // ⚠️ Mover el cierre del modal después de la notificación de éxito
            Swal.fire({
              icon: 'success',
              title: 'Producto actualizado',
              text: 'El producto se ha actualizado correctamente.',
            }).then(() => {
              setShowModal(false);
              setSelectedProducto(null);
            });
  
          } catch (error) {
            console.error("Error al guardar los cambios:", error);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Hubo un error al guardar los cambios.',
            });
          }
        }
      });
    }
  };

  const handleDeleteClick = async (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás recuperar este producto después de eliminarlo.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminarlo!',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteInventory(restaurantId, id);
          setProductos(productos.filter((prod) => prod.id !== id));

          // Alerta de éxito cuando se elimina un producto
          Swal.fire(
            'Eliminado!',
            'El producto ha sido eliminado.',
            'success'
          );
        } catch (error) {
          console.error("Error al eliminar el producto:", error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un error al eliminar el producto.',
          });
        }
      }
    });
  };

  return (
    <div className="container mt-4 text-light" style={{ backgroundColor: '#121212', padding: '20px', borderRadius: '10px' }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-gold">Inventario</h2>
        <Link to="/Inventario/nuevo" className="btn btn-warning text-dark">
          Agregar producto +
        </Link>
      </div>

      {productos.length === 0 ? (
        <div className="alert alert-info" role="alert">
          No hay productos registrados. ¡Agrega uno nuevo!
        </div>
      ) : (
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
                  <td className="d-flex justify-content-center">
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
      )}

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <i className="bi bi-pencil-square me-2"></i>Actualizar Producto
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
              <label className="form-label fw-bold text-light">Categoría</label>
              <select
                className="form-select"
                name="categoria"
                value={selectedProducto?.categoria || ""}
                onChange={(e) =>
                  setSelectedProducto({
                    ...selectedProducto,
                    categoria: e.target.value,
                  })
                }
                required
              >
                <option value="">Seleccione una categoría</option>
                <option value="Lácteos y derivados">Grupo 1: Lácteos y derivados</option>
                <option value="Carne, huevos y pescado">Grupo 2: Carne, huevos y pescado</option>
                <option value="Tubérculos, legumbres y frutos secos">Grupo 3: Tubérculos, legumbres y frutos secos</option>
                <option value="Verduras y hortalizas">Grupo 4: Verduras y hortalizas</option>
                <option value="Frutas">Grupo 5: Frutas</option>
                <option value="Pan, pasta, cereales y azúcar">Grupo 6: Pan, pasta, cereales y azúcar</option>
                <option value="Grasas, aceites y mantequillas">Grupo 7: Grasas, aceites y mantequillas</option>
              </select>
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
}

export default Inventario;
