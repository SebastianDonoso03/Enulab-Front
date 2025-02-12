import React from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";


const Reserva= () => {
  const reserva = {
    nombre: "Juan Pérez",
    hora: "19:00",
    fecha: "2025-02-12",
    telefono: "123-456-7890",
    reservado: true,
  };

  return (
    <div className="Container">
        <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Proveedores</h2>
        <Link to="/CrearReservas" className="btn btn-primary">
          Agregar proveedor +
        </Link>
      </div>

 <Card sx={{ maxWidth: 300, borderRadius: "15px", boxShadow: 3, padding: 2 }}>
      <CardContent>
        <Typography variant="h6">{reserva.nombre}</Typography>
        <Typography variant="body1">Hora: {reserva.hora}</Typography>
        <Typography variant="body1">Fecha: {reserva.fecha}</Typography>
        <Typography variant="body1">Teléfono: {reserva.telefono}</Typography>
        <Typography variant="body1">Reservado: {reserva.reservado ? "Sí" : "No"}</Typography>
        <Button variant="contained" color="primary" sx={{ mt: 2, mr: 1 }}>
          Actualizar
        </Button>
        <Button variant="contained" color="error" sx={{ mt: 2 }}>
          Eliminar
        </Button>
      </CardContent>
    </Card>

    </div>
   
  );
};

export default Reserva;
