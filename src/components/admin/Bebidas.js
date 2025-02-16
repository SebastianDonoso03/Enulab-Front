import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";

const Bebidas = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedBebida, setSelectedBebida] = useState(null);

  useEffect(() => {
    setShowModal(true);
  }, []);

  const bebidas = [
    {
      id: 1,
      nombre: "Coca Cola",
      descripcion: "Refresco",
      precio: 2.5,
    },
    {
      id: 2,
      nombre: "Pepsi",
      descripcion: "Refresco",
      precio: 2.0,
    },
    {
      id: 3,
      nombre: "Fanta",
      descripcion: "Refresco",
      precio: 2.0,
    },
    {
      id: 4,
      nombre: "Sprite",
      descripcion: "Refresco",
      precio: 2.0,
    },
  ];

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Bebidas</h1>
      <Link to="/Crear-Bebida" className="btn btn-primary mb-3">
        <i className="bi bi-plus-circle me-2"></i> Agregar Bebida +
      </Link>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>
          {bebidas.map((bebida) => (
            <tr key={bebida.id}>
              <td>{bebida.nombre}</td>
              <td>{bebida.descripcion}</td>
              <td>{bebida.precio}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            <i className="bi bi-info-circle me-2"></i> Información
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <i className="bi bi-exclamation-circle display-3 text-warning"></i>
          <p  className="mt-3" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.2rem" }}>
  <h3 className="mt-3">
    Estamos trabajando en mejorar y ampliar nuestras opciones de servicio para ofrecerte una experiencia aún mejor. 
    Muy pronto estarán disponibles estas y otras novedades.
  </h3>
  <h4 style={{ textDecoration: "underline" }}>
    ¡Agradecemos tu paciencia y confianza mientras seguimos innovando para ti!
  </h4>
</p>

     
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn btn-warning text-dark"
            onClick={() => setShowModal(false)}
          >
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Bebidas;
