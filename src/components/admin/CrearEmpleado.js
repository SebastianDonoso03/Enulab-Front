import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Empleados.css";

const CrearEmpleado = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    cedula: "",
    genero: "",
    cargo: "",
    sueldo: "",
    telefono: "",
    edad: "",
    jornada: "Matutina",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Empleado agregado:", formData);
    navigate("/empleados"); // Redirige a la lista de empleados
  };

  return (
    <div className="employee-container">
      <h2 className="employee-header">Creación de empleado</h2>
      <form className="employee-form" onSubmit={handleSubmit}>
        <label>Nombre del empleado</label>
        <input type="text" name="nombre" onChange={handleChange} required />

        <label>Número de cédula</label>
        <input type="text" name="cedula" onChange={handleChange} required />

        <label>Género</label>
        <select name="genero" onChange={handleChange}>
          <option value="Masculino">Masculino</option>
          <option value="Femenino">Femenino</option>
        </select>

        <label>Cargo</label>
        <input type="text" name="cargo" onChange={handleChange} required />

        <label>Sueldo</label>
        <input type="number" name="sueldo" onChange={handleChange} required />

        <label>Número de teléfono</label>
        <input type="text" name="telefono" onChange={handleChange} required />

        <label>Edad</label>
        <input type="number" name="edad" onChange={handleChange} required />

        <label>Jornada laboral</label>
        <select name="jornada" onChange={handleChange}>
          <option value="Matutina">Matutina (09:00 - 17:00)</option>
          <option value="Vespertina">Vespertina (12:00 - 17:00)</option>
          <option value="Nocturna">Nocturna (18:00 - 00:00)</option>
        </select>

        <div className="form-buttons">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/empleados")}
          >
            Atrás
          </button>
          <button type="submit" className="btn btn-primary">
            Continuar
          </button>
        </div>
      </form>
    </div>
  );
};

export default CrearEmpleado;
