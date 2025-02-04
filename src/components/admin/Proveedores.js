import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap"; 

const Proveedores = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedProveedor, setSelectedProveedor] = useState(null); 
  const [proveedores, setProveedores] = useState([
    {
      id: 1,
      name: "José G. Vera",
      contacto: "715652348",
      email: "jose@gmail.com",
      direccion: "Calderon",
      ciudad: "Quito",
      provincia: "Pichincha",
      producto: "carne",
    },
    {
      id: 2,
      name: "María López",
      contacto: "715652349",
      email: "maria@gmail.com",
      direccion: "ElInca",
      ciudad: "Quito",
      provincia: "Pichincha",
      producto: "vegetales",
    },
  ]);

  const handleUpdateClick = (proveedor) => {
    setSelectedProveedor(proveedor);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProveedor(null);
  };

  const handleDeleteClick = (id) => {
    if (
      window.confirm("¿Estás seguro de que deseas eliminar este proveedor?")
    ) {
      const updatedProveedores = proveedores.filter((prov) => prov.id !== id);
      setProveedores(updatedProveedores); 
      console.log("Proveedor eliminado:", id);
    }
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Proveedores</h2>
        <Link to="/Proveedores/nuevo" className="btn btn-primary">
          Agregar proveedor +
        </Link>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Contacto</th>
            <th>Email</th>
            <th>Dirección</th>
            <th>Ciudad</th>
            <th>Provincia</th>
            <th>Producto</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {proveedores.map((prov) => (
            <tr key={prov.id}>
              <td>{prov.name}</td>
              <td>{prov.contacto}</td>
              <td>{prov.email}</td>
              <td>{prov.direccion}</td>
              <td>{prov.ciudad}</td>
              <td>{prov.provincia}</td>
              <td>{prov.producto}</td>
              <td>
                <button
                  className="btn  btn-sm me-2"
                  onClick={() => handleUpdateClick(prov)}
                >
                  <i className="bi bi-pencil"></i> Actualizar
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDeleteClick(prov.id)}
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
            Actualizar Proveedor
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label className="form-label">Nombre del Proveedor</label>
              <input
                type="text"
                className="form-control"
                defaultValue={selectedProveedor?.name || ""}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Contacto</label>
              <input
                type="text"
                className="form-control"
                defaultValue={selectedProveedor?.contacto || ""}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="text"
                className="form-control"
                defaultValue={selectedProveedor?.email || ""}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Dirección</label>
              <input
                type="text"
                className="form-control"
                defaultValue={selectedProveedor?.direccion || ""}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Ciudad</label>
              <input
                type="text"
                className="form-control"
                defaultValue={selectedProveedor?.ciudad || ""}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Provincia</label>
              <input
                type="text"
                className="form-control"
                defaultValue={selectedProveedor?.provincia || ""}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Producto</label>
              <input
                type="text"
                className="form-control"
                defaultValue={selectedProveedor?.producto || ""}
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

export default Proveedores;
