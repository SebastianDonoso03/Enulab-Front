import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Link } from "react-router-dom";
import { getReservationsByRestaurant, updateReservation, deleteReservation } from "../../services/reservaServices";

import "../../styles/Reservas.css";

const Reserva = () => {
  const restaurantId = localStorage.getItem("selectedRestaurantId");
  const [openModal, setOpenModal] = useState(false);
  const [selectedReserva, setSelectedReserva] = useState(null);
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const data = await getReservationsByRestaurant(restaurantId);
        setReservas(data);
      } catch (error) {
        console.error("Error al obtener las reservas:", error);
      }
    };
    fetchReservas();
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
        <Link to="/CrearReservas" className="btn btn-primary btn-lg">
          Agregar Reserva +
        </Link>
      </div>

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
                <p>Reservado: {reserva.pay ? "Sí" : "No"}</p>
                <div className="d-flex gap-2 justify-content-center">
                  <button
                    className="btn btn-sm btn-warning"
                    onClick={() => handleOpenModal(reserva)}
                  >
                    <i className="bi bi-arrow-repeat"></i> Actualizar
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(reserva.id)}
                  >
                    <i className="bi bi-trash"></i> Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <Modal isOpen={openModal} toggle={handleCloseModal}>
        <ModalHeader toggle={handleCloseModal}>
          <i className="bi bi-pencil-square me-2"></i>
          Actualizar Reserva
        </ModalHeader>
        <ModalBody>
          <form onSubmit={handleSaveChanges}>
            <div className="mb-3">
              <label htmlFor="name">Nombre</label>
              <input
                type="text"
                className="form-control"
                name="name"
                id="name"
                value={selectedReserva?.name || ''}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="code">Código</label>
              <input
                type="number"
                className="form-control"
                name="code"
                id="code"
                value={selectedReserva?.code || ''}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="note">Nota</label>
              <textarea
                className="form-control"
                name="note"
                id="note"
                value={selectedReserva?.note || ''}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="hour">Hora</label>
              <input
                type="time"
                className="form-control"
                name="hour"
                id="hour"
                value={selectedReserva?.hour || ''}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="date">Fecha</label>
              <input
                type="date"
                className="form-control"
                name="date"
                id="date"
                value={selectedReserva?.date ? new Date(selectedReserva.date).toISOString().split('T')[0] : ''}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="numcontact">Teléfono</label>
              <input
                type="text"
                className="form-control"
                name="numcontact"
                id="numcontact"
                value={selectedReserva?.numcontact || ''}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                name="pay"
                id="pay"
                checked={selectedReserva?.pay || false}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="pay">
                Reservado
              </label>
            </div>
            <ModalFooter>
              <Button  className="btn btn-warning text-dark" onClick={handleCloseModal}>
                Cancelar
              </Button>
              <Button  className="btn btn-warning text-dark" type="submit">
                Guardar Cambios
              </Button>
            </ModalFooter>
          </form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default Reserva;