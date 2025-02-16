import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";

const Postres = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedPostre, setSelectedPostre] = useState(null);

  useEffect(() => {
    setShowModal(true);
  }, []);

  const postres = [
    {
      id: 1,
      nombre: "Helado",
      descripcion: "Helado de vainilla",
      precio: 3.0,
    },
    {
      id: 2,
      nombre: "Tarta de queso",
      descripcion: "Tarta de queso con frutas",
      precio: 5.0,
    },
    {
      id: 3,
      nombre: "Brownie",
      descripcion: "Brownie con chocolate",
      precio: 4.0,
    },
    {
      id: 4,
      nombre: "Gelatina",
      descripcion: "Gelatina de frutas",
      precio: 2.5,
    },
  ];

  return (
    <div className="container">
      <h1>Postres</h1>
      <Link to="/Crear-Postre" className="btn btn-primary mb-3">
        <i className="bi bi-plus-circle me-2"></i>
        Crear Postre +
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
          {postres.map((postre) => (
            <tr key={postre.id}>
              <td>{postre.nombre}</td>
              <td>{postre.descripcion}</td>
              <td>{postre.precio}</td>
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
          <Button className="btn btn-warning text-dark" onClick={() => setShowModal(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default Postres;
