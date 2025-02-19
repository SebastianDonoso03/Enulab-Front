import React, { useState, useEffect, useRef } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Link } from "react-router-dom";
import { getReservationsByRestaurant, updateReservation, deleteReservation } from "../../services/reservaServices";
import Swal from "sweetalert2";
import QrCodeViewer from "./Qr";
import "../../styles/Reservas.css";

const Reserva = () => {
  const restaurantId = localStorage.getItem("selectedRestaurantId");
  const [openModal, setOpenModal] = useState(false);
  const [openQrModal, setOpenQrModal] = useState(false); // Estado para el modal del QR
  const [selectedReserva, setSelectedReserva] = useState(null);
  const [reservas, setReservas] = useState([]);
  const reservasRef = useRef([]);

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const data = await getReservationsByRestaurant(restaurantId);
        if (reservasRef.current.length > 0 && data.length > reservasRef.current.length) {
          Swal.fire({
            title: "Nueva Reserva!",
            text: "Se ha agregado una nueva reserva.",
            icon: "info",
            confirmButtonColor: "#f39c12",
          });
        }
        reservasRef.current = data;
        setReservas(data);
      } catch (error) {
        console.error("Error al obtener las reservas:", error);
      }
    };
    fetchReservas();
    const interval = setInterval(fetchReservas, 5000);
    return () => clearInterval(interval);
  }, [restaurantId]);

  const handleOpenModal = (reserva) => {
    setSelectedReserva(reserva);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedReserva(null);
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    if (selectedReserva) {
      try {
        await updateReservation(restaurantId, selectedReserva.id, selectedReserva);
        setOpenModal(false);
        const updatedReservations = await getReservationsByRestaurant(restaurantId);
        setReservas(updatedReservations);
      } catch (error) {
        console.error("Error al guardar los cambios:", error);
      }
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar?")) {
      try {
        await deleteReservation(restaurantId, id);
        setReservas(reservas.filter((reserva) => reserva.id !== id));
      } catch (error) {
        console.error("Error al eliminar la reserva:", error);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSelectedReserva(prevState => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  return (
    <div className="restaurantes-container min-vh-100 w-100">
      <h2 className="restaurantes-title text-center">Reservas</h2>

      <div className="d-flex justify-content-center mb-4">
        <Link to="/CrearReservas" className="btn btn-warning text-dark">
          Agregar Reserva +
        </Link>
      </div>

      {/* Botón o ícono para abrir el modal del QR */}
      <div className="d-flex justify-content-center mb-4">
        <Button
          className="btn btn-info"
          onClick={() => setOpenQrModal(true)}
          style={{
            fontSize: '24px',
            padding: '10px 20px',
            backgroundColor: "#17a2b8",
            borderColor: "#17a2b8",
          }}
        >
          <i className="bi bi-qr-code-scan"></i> Ver QR
        </Button>
      </div>

      {/* Modal para mostrar el QR */}
      <Modal isOpen={openQrModal} toggle={() => setOpenQrModal(false)}>
        <ModalHeader toggle={() => setOpenQrModal(false)}>
          <i className="bi bi-qr-code me-2"></i>
          Escanea el Código QR
        </ModalHeader>
        <ModalBody>
          <QrCodeViewer /> {/* Aquí se mostrará el QR */}
        </ModalBody>
        <ModalFooter>
          <Button className="btn btn-secondary" onClick={() => setOpenQrModal(false)}>
            Cerrar
          </Button>
        </ModalFooter>
      </Modal>

      <div className="restaurantes-grid">
        {reservas.length === 0 ? (
          <p className="text-center">No hay reservas disponibles</p>
        ) : (
          reservas.map((reserva) => (
            <div key={reserva.id} className="restaurante-card">
              <div className="restaurante-info">
                <h3>{reserva.name}</h3>
                <p>Código: {reserva.code}</p>
                <p>Nota: {reserva.note}</p>
                <p>Hora: {reserva.hour}</p>
                <p>Fecha: {new Date(reserva.date).toISOString().split('T')[0]}</p>
                <p>Teléfono: {reserva.numcontact}</p>
                <p>Reservado: {reserva.confirmed ? "Sí" : "No"}</p>
                <div className="d-flex gap-2 justify-content-center">
                  <button
                    className="btn btn-sm btn-warning"
                    onClick={() => handleOpenModal(reserva)}
                  >
                    <i className="bi bi-arrow-repeat"></i> Actualizar
                  </button>
                  <button
                    className="btn btn-info"
                    onClick={() => handleDelete(reserva.id)}
                  >
                    <i className="btn btn-info"></i> Visualizar
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <Modal isOpen={openModal} toggle={handleCloseModal} centered>
  <ModalHeader toggle={handleCloseModal} className="text-light">
    <i className="bi bi-pencil-square me-2"></i>
    Actualizar Reserva
  </ModalHeader>
  <ModalBody className="text-light">
    <form>
      <div className="mb-3">
        <label className="form-label">Nombre Completo</label>
        <input
          type="text"
          className="form-control"
          name="name"
          value={selectedReserva?.name || ""}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">N° de transacción</label>
        <input
          type="text"
          className="form-control"
          name="code"
          value={selectedReserva?.code || ""}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Banco</label>
        <select
          className="form-control"
          name="bank"
          value={selectedReserva?.bank || ""}
          onChange={handleChange}
        >
          <option value="">Selecciona un banco</option>
          <option value="Pichincha">Banco Pichincha</option>
          <option value="Pacifico">Banco del Pacífico</option>
        </select>
      </div>
      <div className="mb-3">
        <label className="form-label">Fecha</label>
        <input
          type="date"
          className="form-control"
          name="date"
          value={selectedReserva?.date || ""}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Hora</label>
        <input
          type="time"
          className="form-control"
          name="hour"
          value={selectedReserva?.hour || ""}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Teléfono</label>
        <input
          type="text"
          className="form-control"
          name="numcontact"
          value={selectedReserva?.numcontact || ""}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Número de personas</label>
        <input
          type="number"
          className="form-control"
          name="guests"
          min="1"
          value={selectedReserva?.guests || ""}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Notas</label>
        <textarea
          className="form-control"
          name="note"
          rows="2"
          value={selectedReserva?.note || ""}
          onChange={handleChange}
        ></textarea>
      </div>
      {/* Checkbox para confirmar la reserva */}
      <div className="mb-3 form-check">
        <input
          type="checkbox"
          className="form-check-input"
          name="confirmed"
          checked={selectedReserva?.confirmed || false}
          onChange={(e) => handleChange({ target: { name: "confirmed", value: e.target.checked } })}
        />
        <label className="form-check-label">Reserva Confirmada</label>
      </div>
    </form>
  </ModalBody>
  <ModalFooter>
    <Button className="btn btn-secondary" onClick={handleCloseModal}>
      Cancelar
    </Button>
    <Button
      className="btn btn-warning text-dark"
      onClick={handleSaveChanges}
      style={{
        backgroundColor: "#f39c12",
        borderColor: "#f39c12",
        color: "#000",
      }}
    >
      Guardar Cambios
    </Button>
  </ModalFooter>
</Modal>

    </div>
  );
};

export default Reserva;
