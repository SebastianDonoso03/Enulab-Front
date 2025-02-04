import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";

const Inventario = () => {
  const [showModal, setShowModal] = useState(false); 
  const [selectedProducto, setSelectedProducto] = useState(null); 
  const [productos, setProductos] = useState([
    {
      id: 1,
      nombre: "Carne de res",
      estado: true,
      cantidad: "50 kg",
      categoria: "Carnes",
      descripcion: "Carne de res fresca",
    },
    {
      id: 2,
      nombre: "Lechuga",
      estado: false,
      cantidad: "30 unidades",
      categoria: "Vegetales",
      descripcion: "Lechuga romana orgánica",
    },
  ]);

  const handleUpdateClick = (producto) => {
    setSelectedProducto(producto);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProducto(null);
  };

  const handleDeleteClick = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este producto?")) {
      const updatedProductos = productos.filter((prod) => prod.id !== id);
      setProductos(updatedProductos); 
      console.log("Producto eliminado:", id);
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
            <th>Estado</th>
            <th>Cantidad</th>
            <th>Categoría</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((prod) => (
            <tr key={prod.id}>
              <td>{prod.nombre}</td>
              <td>{prod.estado ? "Disponible" : "No disponible"}</td>
              <td>{prod.cantidad}</td>
              <td>{prod.categoria}</td>
              <td>{prod.descripcion}</td>
              <td>
                <button
                  className="btn btn-sm me-2"
                  onClick={() => handleUpdateClick(prod)}
                >
                  <i className="bi bi-pencil"></i> Actualizar
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDeleteClick(prod.id)}
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
                defaultValue={selectedProducto?.nombre || ""}
              />
            </div>
            <div className="mb-3 d-flex align-items-center">
              <input
                type="checkbox"
                className="form-check-input me-2"
                defaultChecked={selectedProducto?.estado || false}
              />
              <label className="form-label">Disponible</label>
            </div>
            <div className="mb-3">
              <label className="form-label">Cantidad</label>
              <input
                type="text"
                className="form-control"
                defaultValue={selectedProducto?.cantidad || ""}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Categoría</label>
              <input
                type="text"
                className="form-control"
                defaultValue={selectedProducto?.categoria || ""}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Descripción</label>
              <textarea
                className="form-control"
                defaultValue={selectedProducto?.descripcion || ""}
              ></textarea>
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

export default Inventario;
