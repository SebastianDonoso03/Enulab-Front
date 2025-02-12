import React, { useState, useEffect } from "react";
import { Card, CardContent, TextField, Button, FormControlLabel, Checkbox } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { createReservation } from "../../services/reservaServices"

const CrearReservas = () => {
  const navigate = useNavigate();
  const [restaurantId, setRestaurantId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    hour: "",
    numcontact: "",
    pay: false,
  });

   useEffect(() => {
     const storedRestaurantId = localStorage.getItem("selectedRestaurantId");
     console.log("ID del restaurante en localStorage:", storedRestaurantId);
 
     if (storedRestaurantId) {
       setRestaurantId(storedRestaurantId);
     } else {
       console.error("No se encontró el restaurantId en localStorage.");
       navigate("/restaurantes"); // Redirigir si no hay ID
     }
   }, [navigate]);

   const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
   const handleSubmit = async (e) => {
      e.preventDefault();
      if (!restaurantId) {
        console.error("No se puede crear un menú sin restaurantId.");
        return;
      }
  
      try {
        const createdMenu = await createReservation(restaurantId, formData);
        console.log("Menú creado:", createdMenu);
        navigate("/Repertorio");
      } catch (error) {
        console.error("Error al crear el menú:", error);
      }
    };

  return (
    <div className="reservas-container">
      <Card sx={{ maxWidth: 400, borderRadius: "15px", boxShadow: 3, padding: 2 }}>
        <CardContent>
          <h2 className="reservas-header" style={{ textAlign: "center" }}>Crear Reserva</h2>
          <form className="reservas-form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Nombre"
              name="name"
              value={formData.name}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Fecha"
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              margin="normal"
              InputLabelProps={{ shrink: true }}
              required
            />
            <TextField
              fullWidth
              label="Hora"
              type="time"
              name="hour"
              value={formData.hour}
              onChange={handleChange}
              margin="normal"
              InputLabelProps={{ shrink: true }}
              required
            />
            <TextField
              fullWidth
              label="Número de Teléfono"
              name="numcontact"
              value={formData.numcontact}
              onChange={handleChange}
              margin="normal"
              required
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="pay"
                  checked={formData.pay}
                  onChange={handleChange}
                />
              }
              label="Pagado"
            />

            <div className="form-buttons" style={{ display: "flex", justifyContent: "space-between", marginTop: "16px" }}>
              <Button variant="contained" color="secondary" onClick={() => navigate(-1)}>
                Atrás
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Guardar Reserva
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CrearReservas;
