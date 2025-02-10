import React, { useState, useEffect } from 'react';
import {  Link } from 'react-router-dom'; // Asegúrate de importar `useParams`
import { Modal, Button } from 'react-bootstrap'; 
import { getEmployeesByRestaurant, updateEmployee, deleteEmployee } from '../../services/employeeServices'; 

const Empleado = () => {
   // Recuperamos el `restaurantId` desde el localStorage
   const restaurantId = localStorage.getItem('selectedRestaurantId'); 
 
  const [showModal, setShowModal] = useState(false); 
  const [selectedEmployee, setSelectedEmployee] = useState(null); 
  const [employees, setEmployees] = useState([]);

  // Función para cargar los empleados al inicio
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const employeesData = await getEmployeesByRestaurant(restaurantId);
        setEmployees(employeesData);
      } catch (error) {
        console.error("Error al cargar los empleados:", error);
      }
    };
    fetchEmployees();
  }, [restaurantId]); // Este efecto se dispara cada vez que cambia el `restaurantId`

  // Función para manejar la actualización del empleado
  const handleUpdateClick = (empleado) => {
    setSelectedEmployee(empleado);
    setShowModal(true);
  };

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedEmployee(null);
  };

  // Función para guardar los cambios después de actualizar
  const handleSaveChanges = async () => {
    if (selectedEmployee) {
      try {
        await updateEmployee(restaurantId, selectedEmployee.id, selectedEmployee); 
        setShowModal(false);
        // Actualizar la lista de empleados después de la actualización
        const updatedEmployees = await getEmployeesByRestaurant(restaurantId);
        setEmployees(updatedEmployees);
      } catch (error) {
        console.error("Error al guardar los cambios:", error);
      }
    }
  };

  // Función para eliminar un empleado
  const handleDeleteClick = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este empleado?")) {
      try {
        await deleteEmployee(restaurantId, id); 
        // Eliminar el empleado de la lista después de la eliminación
        const updatedEmployees = employees.filter((emp) => emp.id !== id);
        setEmployees(updatedEmployees);
      } catch (error) {
        console.error("Error al eliminar el empleado:", error);
      }
    }
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Empleados</h2>
        <Link to={`/empleados/nuevo`} className="btn btn-primary">
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
            {/* Formulario de actualización */}
            <div className="mb-3">
              <label className="form-label">Nombre del empleado</label>
              <input
                type="text"
                className="form-control"
                value={selectedEmployee?.name || ""}
                onChange={(e) =>
                  setSelectedEmployee({ ...selectedEmployee, name: e.target.value })
                }
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Cédula</label>
              <input
                type="text"
                className="form-control"
                value={selectedEmployee?.cedula || ""}
                onChange={(e) =>
                  setSelectedEmployee({ ...selectedEmployee, cedula: e.target.value })
                }
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Edad</label>
              <input
                type="text"
                className="form-control"
                value={selectedEmployee?.edad || ""}
                onChange={(e) =>
                  setSelectedEmployee({ ...selectedEmployee,edad: e.target.value })
                }
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Genero</label>
              <select
                className="form-control"
                value={selectedEmployee?.genero || ""}
                onChange={(e) =>
                  setSelectedEmployee({ ...selectedEmployee, genero: e.target.value })
                }
              >
                 <option value="">------</option>
                <option value="femenino">Femenino</option>
                <option value="masculino">Masculino</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Sueldo</label>
              <input
                type="text"
                className="form-control"
                value={selectedEmployee?.sueldo || ""}
                onChange={(e) =>
                  setSelectedEmployee({ ...selectedEmployee, sueldo: e.target.value })
                }
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Jornada</label>
              <select
                className="form-control"
                value={selectedEmployee?.horario || ""}
                onChange={(e) =>
                  setSelectedEmployee({ ...selectedEmployee, horario: e.target.value })
                }
              >
                <option value="">------</option>
                <option value="Matutino">Matutino</option>
                <option value="Vespertino">Vespertino</option>
                <option value="Nocturno">Nocturno</option>
              </select>
            </div>
            {/* Otros campos */}
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

export default Empleado;
