import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createReservation } from "../../services/reservaServices";
import "bootstrap/dist/css/bootstrap.min.css";
import CrearReserva from "../../styles/CrearReserva.css"

const CrearReservas = () => {
  const navigate = useNavigate();
  const [restaurantId, setRestaurantId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    hour: "",
    numcontact: "",
    pay: false,
    code: "",
    note: ""
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
      console.error("No se puede crear una reserva sin restaurantId.");
      return;
    }

    try {
      const createdReservation = await createReservation(restaurantId, formData);
      console.log("Reserva creada:", createdReservation);
      navigate("/Reservas");
    } catch (error) {
      console.error("Error al crear la reserva:", error);
    }
  };

  return (
    <div className="crear-reserva-container">
      <div className="crear-reserva-content">
        <div className="crear-reserva-card">
          <h2 className="text-center mb-4">Crear Reserva</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input type="text" className="form-control crear-reserva-input" name="name" value={formData.name} onChange={handleChange} placeholder="Nombre" required />
            </div>
            <div className="mb-3">
              <input type="date" className="form-control crear-reserva-input" name="date" value={formData.date} onChange={handleChange} placeholder="Fecha" required />
            </div>
            <div className="mb-3">
              <input type="time" className="form-control crear-reserva-input" name="hour" value={formData.hour} onChange={handleChange} placeholder="Hora" required />
            </div>
            <div className="mb-3">
              <input type="number" className="form-control crear-reserva-input" name="numcontact" value={formData.numcontact} onChange={handleChange} placeholder="Número de Teléfono" required />
            </div>
            <div className="mb-3">
              <input type="number" className="form-control crear-reserva-input" name="code" value={formData.code} onChange={handleChange} placeholder="Código de Reserva" required />
            </div>
            <div className="mb-3">
              <textarea className="form-control crear-reserva-input" name="note" value={formData.note} onChange={handleChange} placeholder="Nota" rows="3"></textarea>
            </div>
            <div className="mb-3 form-check">
              <input type="checkbox" className="form-check-input" name="pay" checked={formData.pay} onChange={(e) => setFormData({ ...formData, pay: e.target.checked })} />
              <label className="form-check-label">Pagado</label>
            </div>
            <div className="d-flex justify-content-between">
              <button type="button" className="btn btn-warning text-dark" onClick={() => navigate(-1)}>
                Atrás
              </button>
              <button type="submit" className="btn btn-warning text-dark">
                Guardar Reserva
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CrearReservas;
