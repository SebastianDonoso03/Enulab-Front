import React, { useState, useEffect } from "react";
import { Card, CardBody, CardTitle, CardText, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { getReservationsByRestaurant, updateReservation, deleteReservation } from "../../services/reservaServices";
import "../../styles/Reservas.css"
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
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Reservas</h2>
        <Link to="/CrearReservas" className="btn btn-primary">
          Agregar reserva +
        </Link>
      </div>

      {reservas.length === 0 ? (
        <p>No hay reservas disponibles</p>
      ) : (
        <Row>
          {reservas.map((reserva) => (
            <Col key={reserva.id} xs="12" sm="6" md="4" lg="3" className="mb-3">
              <Card>
                <CardBody>
                  <CardTitle tag="h5">{reserva.name}</CardTitle>
                  <CardText>Código: {reserva.code}</CardText>
                  <CardText>Nota: {reserva.note}</CardText>
                  <CardText>Hora: {reserva.hour}</CardText>
                  <CardText>Fecha: {new Date(reserva.date).toISOString().split('T')[0]}</CardText>
                  <CardText>Teléfono: {reserva.numcontact}</CardText>
                  <CardText>Reservado: {reserva.pay ? "Sí" : "No"}</CardText>
                  <Button color="primary" onClick={() => handleOpenModal(reserva)}>Actualizar</Button>
                  <Button color="danger" onClick={() => handleDelete(reserva.id)}>  <i className="bi bi-trash"></i>Eliminar</Button>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      <Modal isOpen={openModal} toggle={handleCloseModal}>
        <ModalHeader toggle={handleCloseModal}> <i className="bi bi-pencil-square me-2"></i>Actualizar Reserva</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSaveChanges}>
            <FormGroup>
              <Label for="name">Nombre</Label>
              <Input type="text" name="name" id="name" value={selectedReserva?.name || ''} onChange={handleChange} required />
            </FormGroup>
            <FormGroup>
              <Label for="code">Código</Label>
              <Input type="number" name="code" id="code" value={selectedReserva?.code || ''} onChange={handleChange} required />
            </FormGroup>
            <FormGroup>
              <Label for="note">Nota</Label>
              <Input type="textarea" name="note" id="note" value={selectedReserva?.note || ''} onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <Label for="hour">Hora</Label>
              <Input type="time" name="hour" id="hour" value={selectedReserva?.hour || ''} onChange={handleChange} required />
            </FormGroup>
            <FormGroup>
              <Label for="date">Fecha</Label>
              <Input type="date" name="date" id="date" value={selectedReserva?.date ? new Date(selectedReserva.date).toISOString().split('T')[0] : ''} onChange={handleChange} required />
            </FormGroup>
            <FormGroup>
              <Label for="numcontact">Teléfono</Label>
              <Input type="text" name="numcontact" id="numcontact" value={selectedReserva?.numcontact || ''} onChange={handleChange} required />
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input type="checkbox" name="pay" checked={selectedReserva?.pay || false} onChange={handleChange} />{' '}
                Reservado
              </Label>
            </FormGroup>
            <Button color="secondary" onClick={handleCloseModal} className="mt-3 ml-2">Cancelar</Button>
            <Button type="submit" color="primary" className="mt-3">Guardar Cambios</Button>
          
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default Reserva;
