import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Button, Modal, Box, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { getReservationsByRestaurant, updateReservation, deleteReservation } from "../../services/reservaServices";

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
    <div className="Container">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Reservas</h2>
        <Link to="/CrearReservas" className="btn btn-primary">
          Agregar reserva +
        </Link>
      </div>

      {reservas.length === 0 ? (
        <Typography variant="body1">No hay reservas disponibles</Typography>
      ) : (
        reservas.map((reserva) => (
          <Card key={reserva.id} sx={{ maxWidth: 300, borderRadius: "15px", boxShadow: 3, padding: 2, mb: 2 }}>
            <CardContent>
              <Typography variant="h6">{reserva.name}</Typography>
              <Typography variant="body1">Código: {reserva.code}</Typography>
              <Typography variant="body1">Nota: {reserva.note}</Typography>
              <Typography variant="body1">Hora: {reserva.hour}</Typography>
              <Typography variant="body1">Fecha: {new Date(reserva.date).toISOString().split('T')[0]}</Typography>
              <Typography variant="body1">Teléfono: {reserva.numcontact}</Typography>
              <Typography variant="body1">Reservado: {reserva.pay ? "Sí" : "No"}</Typography>
              <Button variant="contained" color="primary" sx={{ mt: 2, mr: 1 }} onClick={() => handleOpenModal(reserva)}>
                Actualizar
              </Button>
              <Button variant="contained" color="error" sx={{ mt: 2 }} onClick={() => handleDelete(reserva.id)}>
                Eliminar
              </Button>
            </CardContent>
          </Card>
        ))
      )}

      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "white",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            width: 400,
          }}
        >
          <Typography variant="h6" align="center" mb={2}>
            Actualizar Reserva
          </Typography>
          <form onSubmit={handleSaveChanges}>
            <TextField fullWidth label="Nombre" name="name" value={selectedReserva?.name || ''} onChange={handleChange} margin="normal" required />
            <TextField fullWidth label="Código" name="code" type="number" value={selectedReserva?.code || ''} onChange={handleChange} margin="normal" required />
            <TextField fullWidth label="Nota" name="note" value={selectedReserva?.note || ''} onChange={handleChange} margin="normal" multiline rows={3} />
            <TextField fullWidth label="Hora" name="hour" type="time" value={selectedReserva?.hour || ''} onChange={handleChange} margin="normal" required />
            <TextField fullWidth label="Fecha" name="date" type="date" value={selectedReserva?.date ? new Date(selectedReserva.date).toISOString().split('T')[0] : ''} onChange={handleChange} margin="normal" required />
            <TextField fullWidth label="Teléfono" name="numcontact" value={selectedReserva?.numcontact || ''} onChange={handleChange} margin="normal" required />
            <div>
              <input type="checkbox" name="pay" checked={selectedReserva?.pay || false} onChange={handleChange} />
              Reservado
            </div>
            <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
              Guardar Cambios
            </Button>
            <Button variant="outlined" color="secondary" sx={{ mt: 2, ml: 1 }} onClick={handleCloseModal}>
              Cancelar
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default Reserva;
