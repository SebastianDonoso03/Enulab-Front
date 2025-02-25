import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import { getEmployeesByRestaurant, updateEmployee, deleteEmployee } from '../../services/employeeServices';
import Swal from 'sweetalert2'; // Importamos SweetAlert2
import 'bootstrap/dist/css/bootstrap.min.css';
import Empleados from "../../styles/Empleados.css"

const Empleado = () => {
  const restaurantId = localStorage.getItem('selectedRestaurantId');
  const [showModal, setShowModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [employees, setEmployees] = useState([]);

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
  }, [restaurantId]);

  const handleUpdateClick = (empleado) => {
    setSelectedEmployee(empleado);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedEmployee(null);
  };

  const handleSaveChanges = async () => {
    if (selectedEmployee) {
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
            await updateEmployee(restaurantId, selectedEmployee.id, selectedEmployee);
            setShowModal(false);
            const updatedEmployees = await getEmployeesByRestaurant(restaurantId);
            setEmployees(updatedEmployees);
  
            // Alerta de éxito en la actualización
            Swal.fire({
              icon: 'success',
              title: 'Empleado actualizado',
              text: 'El empleado se actualizó correctamente',
              confirmButtonColor: '#f39c12',
            });
          } catch (error) {
            console.error("Error al guardar los cambios:", error);
            // Alerta de error
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Hubo un error al actualizar el empleado',
              confirmButtonColor: '#f39c12',
            });
          }
        }
      });
    }
  };

  const handleDeleteClick = (id) => {
    // Confirmación de eliminación
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esto",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminarlo',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteEmployee(restaurantId, id);
          setEmployees(employees.filter((emp) => emp.id !== id));
          // Alerta de éxito en la eliminación
          Swal.fire({
            icon: 'success',
            title: 'Empleado eliminado',
            text: 'El empleado se eliminó correctamente',
            confirmButtonColor: '#f39c12',
          });
        } catch (error) {
          console.error("Error al eliminar el empleado:", error);
          // Alerta de error en eliminación
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un error al eliminar el empleado',
            confirmButtonColor: '#f39c12',
          });
        }
      }
    });
  };

  return (
    <div className="container mt-4 text-light" style={{ backgroundColor: '#121212', padding: '20px', borderRadius: '10px' }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-gold">Empleados</h2>
        <Link to="/empleados/nuevo" className="btn btn-warning text-dark">
          Agregar empleado +
        </Link>
      </div>

      {/* Aquí se muestra el mensaje si no hay empleados */}
      {employees.length === 0 ? (
        <div className="alert alert-info" role="alert">
          No hay empleados registrados. ¡Agrega uno nuevo!
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-dark table-hover text-center">
            <thead>
              <tr className="text-warning">
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
                  <td className="d-flex justify-content-center">
                    <button className="btn btn-warning btn-sm me-2" onClick={() => handleUpdateClick(emp)}>
                      <i className="bi bi-arrow-repeat"></i> Actualizar
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDeleteClick(emp.id)}>
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
        <Modal.Header closeButton className="text-warning">
          <Modal.Title>
            <i className="bi bi-pencil-square me-2"></i> Actualizar Empleado
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-light">
          <form>
            <div className="mb-3">
              <label className="form-label">Nombre</label>
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
                type="number"
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
                type="number"
                className="form-control"
                value={selectedEmployee?.edad || ""}
                onChange={(e) =>
                  setSelectedEmployee({ ...selectedEmployee, edad: e.target.value })
                }
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Género</label>
              <select
                className="form-control"
                value={selectedEmployee?.genero || ""}
                onChange={(e) =>
                  setSelectedEmployee({ ...selectedEmployee, genero: e.target.value })
                }
              >
                <option value="">Verifica el genero del empleado</option>
                <option value="femenino">Femenino</option>
                <option value="masculino">Masculino</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Sueldo</label>
              <input
                type="number"
                className="form-control"
                value={selectedEmployee?.sueldo || ""}
                onChange={(e) =>
                  setSelectedEmployee({ ...selectedEmployee, sueldo: e.target.value })
                }
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Horario</label>
              <select
                className="form-control"
                value={selectedEmployee?.horario || ""}
                onChange={(e) =>
                  setSelectedEmployee({ ...selectedEmployee, horario: e.target.value })
                }
              >
                <option value="">Verifica la Jornada</option>
                <option value="Matutino">Matutino</option>
                <option value="Vespertino">Vespertino</option>
                <option value="NOcturno">Nocturno</option>
              </select>
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

export default Empleado;