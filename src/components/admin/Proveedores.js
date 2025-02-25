import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import { deleteSupplier, updateSupplier, getSupplierByRestaurant } from "../../services/supplierServices";
import Swal from "sweetalert2"; // Importamos SweetAlert2

const ciudadesEcuador = [
  "Quito", "Guayaquil", "Cuenca", "Santo Domingo", "Machala", "Manta", "Portoviejo", "Ambato", "Loja", "Ibarra"
];

const provinciasEcuador = [
  "Azuay", "Bolívar", "Cañar", "Carchi", "Chimborazo", "Cotopaxi", "El Oro", "Esmeraldas", "Galápagos", "Guayas",
  "Imbabura", "Loja", "Los Ríos", "Manabí", "Morona Santiago", "Napo", "Orellana", "Pastaza", "Pichincha", "Santa Elena",
  "Santo Domingo de los Tsáchilas", "Sucumbíos", "Tungurahua", "Zamora Chinchipe"
];

const Proveedores = () => {
  const restaurantId = localStorage.getItem("selectedRestaurantId");

  const [showModal, setShowModal] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [proveedores, setProveedores] = useState([]);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const supplierData = await getSupplierByRestaurant(restaurantId);
        setProveedores(supplierData);
      } catch (error) {
        console.error("Error al cargar los proveedores.", error);
      }
    };
    if (restaurantId) {
      fetchSuppliers();
    }
  }, [restaurantId]);

  const handleUpdateClick = (proveedor) => {
    setSelectedSupplier(proveedor);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedSupplier(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedSupplier((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    if (selectedSupplier) {
      // Confirmar antes de guardar los cambios
      const result = await Swal.fire({
        title: '¿Estás seguro?',
        text: '¿Deseas guardar los cambios?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, guardar',
        cancelButtonText: 'Cancelar',
      });

      if (result.isConfirmed) {
        try {
          await updateSupplier(restaurantId, selectedSupplier.id, selectedSupplier);
          setShowModal(false);

          const updatedSuppliers = await getSupplierByRestaurant(restaurantId);
          setProveedores(updatedSuppliers);
          Swal.fire('¡Éxito!', 'Proveedor actualizado correctamente.', 'success');
        } catch (error) {
          console.error("Error al guardar los cambios", error);
          Swal.fire('Error', 'Hubo un problema al actualizar el proveedor.', 'error');
        }
      }
    }
  };

  const handleDeleteClick = async (id) => {
    // Confirmar antes de eliminar
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Deseas eliminar este proveedor?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });

    if (result.isConfirmed) {
      try {
        await deleteSupplier(restaurantId, id);
        const updatedSuppliers = proveedores.filter((prov) => prov.id !== id);
        setProveedores(updatedSuppliers);
        Swal.fire('¡Eliminado!', 'Proveedor eliminado correctamente.', 'success');
      } catch (error) {
        console.error("Error al eliminar el proveedor", error);
        Swal.fire('Error', 'Hubo un problema al eliminar el proveedor.', 'error');
      }
    }
  };

  return (
    <div className="container mt-4 text-light" style={{ backgroundColor: '#121212', padding: '20px', borderRadius: '10px' }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-gold">Proveedores</h2>
        <Link to="/Proveedores/nuevo" className="btn btn-warning text-dark">
          Agregar proveedor +
        </Link>
      </div>

      {proveedores.length === 0 ? (
        <div className="alert alert-info" role="alert">
          No hay proveedores registrados. ¡Agrega uno nuevo!
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-dark table-hover text-center">
            <thead>
              <tr className="text-warning">
                <th>Nombre</th>
                <th>Contacto</th>
                <th>Email</th>
                <th>Dirección</th>
                <th>Ciudad</th>
                <th>Provincia</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {proveedores.map((prov) => (
                <tr key={prov.id}>
                  <td>{prov.namesupplier}</td>
                  <td>{prov.numcontact}</td>
                  <td>{prov.email}</td>
                  <td>{prov.direction}</td>
                  <td>{prov.city}</td>
                  <td>{prov.country}</td>
                  <td className="d-flex justify-content-center">
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => handleUpdateClick(prov)}
                    >
                      <i className="bi bi-pencil"></i> Actualizar
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDeleteClick(prov.id)}
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
        <Modal.Header closeButton className=" text-light">
          <Modal.Title>
            <i className="bi bi-pencil-square me-2"></i>
            Actualizar Proveedor
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className=" text-light">
          <form>
            <div className="mb-3">
              <label className="form-label">Nombre del Proveedor</label>
              <input
                type="text"
                className="form-control"
                name="namesupplier"
                value={selectedSupplier?.namesupplier || ""}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Contacto</label>
              <input
                type="text"
                className="form-control"
                name="numcontact"
                value={selectedSupplier?.numcontact || ""}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={selectedSupplier?.email || ""}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Dirección</label>
              <input
                type="text"
                className="form-control"
                name="direction"
                value={selectedSupplier?.direction || ""}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Ciudad</label>
              <select className="form-control" name="city" value={selectedSupplier?.city || ""} onChange={handleInputChange}>
                <option value="">Seleccione una ciudad</option>
                {ciudadesEcuador.map((ciudad) => (
                  <option key={ciudad} value={ciudad}>{ciudad}</option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Provincia</label>
              <select className="form-control" name="country" value={selectedSupplier?.country || ""} onChange={handleInputChange}>
                <option value="">Seleccione una provincia</option>
                {provinciasEcuador.map((provincia) => (
                  <option key={provincia} value={provincia}>{provincia}</option>
                ))}
              </select>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn btn-warning text-dark" onClick={handleCloseModal} style={{
            backgroundColor: "#f39c12",
            borderColor: "#f39c12",
            color: "#000",
          }}>
            Cancelar
          </Button>
          <Button className="btn btn-warning text-dark" onClick={handleSaveChanges} style={{
            backgroundColor: "#f39c12",
            borderColor: "#f39c12",
            color: "#000",
          }}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Proveedores;
