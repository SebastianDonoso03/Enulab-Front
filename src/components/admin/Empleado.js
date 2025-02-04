import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap"; // Importa Modal y Button de react-bootstrap

const Empleado = () => {
  const [showModal, setShowModal] = useState(false); // Estado para controlar la visibilidad del modal
  const [selectedEmpleado, setSelectedEmpleado] = useState(null); // Estado para almacenar el empleado seleccionado

  const employees = [
    {
      id: 1,
      name: "José G. Vera",
      cedula: "715652348",
      edad: 24,
      genero: "Masculino",
      sueldo: "$460",
      horario: "11:00 AM - 09:00 PM",
    },
    {
      id: 2,
      name: "María López",
      cedula: "715652349",
      edad: 30,
      genero: "Femenino",
      sueldo: "$500",
      horario: "09:00 AM - 05:00 PM",
    },
  ];

  const handleUpdateClick = (empleado) => {
    setSelectedEmpleado(empleado);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedEmpleado(null);
  };

  const handleDeleteClick = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este empleado?")) {
      console.log("Empleado eliminado:", id);
    }
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Empleados</h2>
        <Link to="/empleados/nuevo" className="btn btn-primary">
          Agregar empleado +
        </Link>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Cédula</th>
            <th>Edad</th>
            <th>Género</th>
            <th>Sueldo</th>
            <th>Horario</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.name}</td>
              <td>{emp.cedula}</td>
              <td>{emp.edad}</td>
              <td>{emp.genero}</td>
              <td>{emp.sueldo}</td>
              <td>{emp.horario}</td>
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
            Actualizar Empleado
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label className="form-label">Nombre del empleado</label>
              <input
                type="text"
                className="form-control"
                defaultValue={selectedEmpleado?.name || ""}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Número de cédula</label>
              <input
                type="text"
                className="form-control"
                defaultValue={selectedEmpleado?.cedula || ""}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Edad</label>
              <input
                type="number"
                className="form-control"
                defaultValue={selectedEmpleado?.edad || ""}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Género</label>
              <select
                className="form-control"
                defaultValue={selectedEmpleado?.genero || ""}
              >
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Sueldo</label>
              <input
                type="text"
                className="form-control"
                defaultValue={selectedEmpleado?.sueldo || ""}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Horario</label>
              <input
                type="text"
                className="form-control"
                defaultValue={selectedEmpleado?.horario || ""}
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


export default Empleado;