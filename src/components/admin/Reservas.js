import React, { useState, useEffect, useRef } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input } from "reactstrap";
//import { Link } from "react-router-dom";
import { getReservationsByRestaurant, updateReservation } from "../../services/reservaServices";
import Swal from "sweetalert2";
import QrCodeViewer from "./Qr";
import "../../styles/Reservas.css";

const Reserva = () => {
  const restaurantId = localStorage.getItem("selectedRestaurantId");
  const [openModal, setOpenModal] = useState(false);
  const [openQrModal, setOpenQrModal] = useState(false); // Estado para el modal del QR
  const [openViewModal, setOpenViewModal] = useState(false); // Estado para el modal de visualización
  const [selectedReserva, setSelectedReserva] = useState({});
  const [reservas, setReservas] = useState([]);
  const reservasRef = useRef([]);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB'); // Esto te da el formato DD/MM/YYYY
  };
  

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

  const handleOpenViewModal = (reserva) => {
    setSelectedReserva(reserva);
    setOpenViewModal(true);
  };

  const handleCloseViewModal = () => {
    setOpenViewModal(false);
    setSelectedReserva(null);
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    if (selectedReserva) {
      try {
        // Realizar la actualización en el servidor
        await updateReservation(restaurantId, selectedReserva.id, selectedReserva);
  
        // Actualizar la reserva en el estado sin cambiar el orden
        setReservas(prevReservas => {
          // Encontrar el índice de la reserva actualizada
          const updatedIndex = prevReservas.findIndex(res => res.id === selectedReserva.id);
          
          if (updatedIndex !== -1) {
            // Crear un nuevo arreglo con la reserva actualizada en su lugar original
            const updatedReservas = [...prevReservas];
            updatedReservas[updatedIndex] = selectedReserva;
            return updatedReservas;
          }
  
          return prevReservas;
        });
  
        setOpenModal(false);
      } catch (error) {
        console.error("Error al guardar los cambios:", error);
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
      <h2 className="reservas-title">Reservas</h2>

      {/* Botón para abrir el modal del QR */}
      <div className="d-flex justify-content-center mb-4">
        <Button
          className="btn btn-info"
          onClick={() => setOpenQrModal(true)}
          style={{ fontSize: "24px", padding: "10px 20px" }}
        >
          <i className="bi bi-qr-code-scan"></i> Ver QR
        </Button>
      </div>

      {/* Modal del QR */}
      <Modal isOpen={openQrModal} toggle={() => setOpenQrModal(false)}>
        <ModalHeader toggle={() => setOpenQrModal(false)}>
          <i className="bi bi-qr-code me-2"></i> Escanea el Código QR
        </ModalHeader>
        <ModalBody>
          <QrCodeViewer />
        </ModalBody>
        <ModalFooter>
          <Button className="btn btn-secondary" onClick={() => setOpenQrModal(false)}>
            Cerrar
          </Button>
        </ModalFooter>
      </Modal>

      {/* Lista de reservas en cuadrícula */}
      <div
  className="d-grid gap-3 px-3"
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    // Si solo hay una reserva, limitar el tamaño del contenedor
    width: reservas.length === 1 ? "auto" : "100%",  // Ajustar ancho
    maxWidth: reservas.length === 1 ? "500px" : "none",  // Limitar el tamaño máximo
    margin: reservas.length === 1 ? "0 auto" : "0",  // Centrar si hay solo una reserva
  }}
>
  {reservas.length === 0 ? (
    <p className="reservaDisponible">No hay reservas disponibles</p>
  ) : (
    reservas.map((reserva) => (
      <div key={reserva.id} className="restaurante-card p-3 border rounded shadow">
        <h3>{reserva.name}</h3>
        <p>Código: {reserva.code}</p>
        <p>Nota: {reserva.note}</p>
        <p>Hora: {reserva.hour}</p>
        <p>Fecha: {new Date(reserva.date).toISOString().split("T")[0]}</p>
        <p>Teléfono: {reserva.numcontact}</p>
        <p>Reservado: {reserva.confirmed ? "Sí" : "No"}</p>
        <div className="d-flex gap-2 justify-content-center">
          <button className="btn btn-warning btn-sm" onClick={() => handleOpenModal(reserva)}>
            <i className="bi bi-arrow-repeat"></i> Actualizar
          </button>
          <button className="btn btn-info btn-sm" onClick={() => handleOpenViewModal(reserva)}>
            <i className="bi bi-eye"></i> Visualizar
          </button>
        </div>
      </div>
    ))
  )}
</div>
       {/* Modal de visualización */}
      <Modal isOpen={openViewModal} toggle={handleCloseViewModal} centered>
        <ModalHeader toggle={handleCloseViewModal} className="text-white">
          <i className="bi bi-eye me-2"></i> Visualizar Reserva
        </ModalHeader>
        <ModalBody className="text-white">
          {selectedReserva && (
            <div>
              <p><strong>Nombre Completo:</strong> {selectedReserva.name}</p>
              <p><strong>Código:</strong> {selectedReserva.code}</p>
              <p><strong>Banco:</strong> {selectedReserva.bank}</p>
              <p><strong>Fecha:</strong> {selectedReserva.date}</p>
              <p><strong>Hora:</strong> {selectedReserva.hour}</p>
              <p><strong>Teléfono:</strong> {selectedReserva.numcontact}</p>
              <p><strong>Número de Personas:</strong> {selectedReserva.guests}</p>
              <p><strong>Notas:</strong> {selectedReserva.note}</p>
              <p><strong>Confirmada:</strong> {selectedReserva.confirmed ? "Sí" : "No"}</p>
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          <Button className="btn btn-secondary" onClick={handleCloseViewModal}>
            Cerrar
          </Button>
        </ModalFooter>
      </Modal>

      {/* Modal de edición */}
      <Modal isOpen={openModal} toggle={handleCloseModal} centered>
        <ModalHeader toggle={handleCloseModal} className="text-dark">
          <i className="bi bi-pencil-square me-2"></i> Actualizar Reserva
        </ModalHeader>
        <ModalBody className="text-dark">
          <form>
            <div className="mb-3">
              <label className="form-label">Nombre Completo</label>
              <input type="text" className="form-control" name="name" value={selectedReserva?.name || ""} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label className="form-label">N° de transacción</label>
              <input type="text" className="form-control" name="code" value={selectedReserva?.code || ""} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label className="form-label">Banco</label>
              <select className="form-control" name="bank" value={selectedReserva?.bank || ""} onChange={handleChange}>
                <option value="">Selecciona un banco</option>
                <option value="Pichincha">Banco Pichincha</option>
                <option value="Pacifico">Banco del Pacífico</option>
              </select>
            </div>
            <div className="mb-3">
                <label htmlFor="date" className="form-label">Fecha</label>
                <Input
                  type="text"
                  name="date"
                  value={selectedReserva.date ? formatDate(selectedReserva.date) : ""}
                  onChange={handleChange}
                />
              </div>
            <div className="mb-3">
              <label className="form-label">Hora</label>
              <input type="time" className="form-control" name="hour" value={selectedReserva?.hour || ""} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label className="form-label">Teléfono</label>
              <input type="text" className="form-control" name="numcontact" value={selectedReserva?.numcontact || ""} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label className="form-label">Número de personas</label>
              <input type="number" className="form-control" name="guests" min="1" value={selectedReserva?.guests || ""} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label className="form-label">Notas</label>
              <textarea className="form-control" name="note" rows="2" value={selectedReserva?.note || ""} onChange={handleChange}></textarea>
            </div>
            <div className="mb-3 form-check">
              <input type="checkbox" className="form-check-input" name="confirmed" checked={selectedReserva?.confirmed || false} onChange={handleChange} />
              <label className="form-check-label">Reserva Confirmada</label>
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button className="btn btn-secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button className="btn btn-warning text-dark" onClick={handleSaveChanges}>
            Guardar Cambios
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default Reserva;
