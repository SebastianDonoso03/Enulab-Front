import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createReservation } from "../../services/reservaServices";
import "bootstrap/dist/css/bootstrap.min.css";

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
    <div className="container d-flex justify-content-center align-items-center min-vh-100" style={{  color: "gold" }}>
      <div className="card p-4 shadow-lg" style={{ maxWidth: "500px", width: "100%", borderRadius: "15px", backgroundColor: "#222", border: "2px solid gold" }}>
        <h2 className="text-center mb-4" style={{ color: "gold" }}>Crear Reserva</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Fecha</label>
            <input type="date" className="form-control" name="date" value={formData.date} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Hora</label>
            <input type="time" className="form-control" name="hour" value={formData.hour} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Número de Teléfono</label>
            <input type="text" className="form-control" name="numcontact" value={formData.numcontact} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Código de Reserva</label>
            <input type="number" className="form-control" name="code" value={formData.code} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Nota</label>
            <textarea className="form-control" name="note" value={formData.note} onChange={handleChange} rows="3"></textarea>
          </div>
          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" name="pay" checked={formData.pay} onChange={(e) => setFormData({ ...formData, pay: e.target.checked })} />
            <label className="form-check-label">Pagado</label>
          </div>
          <div className="d-flex justify-content-between">
            <button type="button"  className="btn btn-warning text-dark" onClick={() => navigate(-1)}>Atrás</button>
            <button type="submit"   className="btn btn-warning text-dark">Guardar Reserva</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CrearReservas;
