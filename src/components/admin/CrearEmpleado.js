import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { createEmployee } from "../../services/employeeServices"; // Importa el servicio
import "../../styles/Empleados.css";

const CrearEmpleado = () => {
  const [formData, setFormData] = useState({
    name: "",
    cedula: "",
    edad: "",
    genero: "",
    sueldo: "",
    telefono: "",
    horario: "Matutina", 
  });

  const navigate = useNavigate();
  const location = useLocation();  // Usamos useLocation para acceder a la ubicación actual
  const { restaurantId } = location.state || {}; // Extraemos el restaurantId del state

  useEffect(() => {
    if (!restaurantId) {
      console.error("No se encontró el restaurantId en el estado.");
      // Redirigir o mostrar un mensaje si no se encuentra el restaurantId
    }
  }, [restaurantId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const createdEmployee = await createEmployee(restaurantId, formData);
      console.log("Empleado creado:", createdEmployee);
      navigate("/empleados"); // Redirige a la lista de empleados
    } catch (error) {
      console.error("Error al crear el empleado:", error);
    }
  };

  return (
    <div className="employee-container">
      <h2 className="employee-header">Creación de empleado</h2>
      <form className="employee-form" onSubmit={handleSubmit}>
        <label>Nombre del empleado</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label>Número de cédula</label>
        <input
          type="text"
          name="cedula"
          value={formData.cedula}
          onChange={handleChange}
          required
        />

        <label>Edad</label>
        <input
          type="number"
          name="edad"
          value={formData.edad}
          onChange={handleChange}
          required
        />

        <label>Género</label>
        <select name="genero" value={formData.genero} onChange={handleChange}>
          <option value="Masculino">Masculino</option>
          <option value="Femenino">Femenino</option>
        </select>

        <label>Sueldo</label>
        <input
          type="number"
          name="sueldo"
          value={formData.sueldo}
          onChange={handleChange}
          required
        />

        <label>Número de teléfono</label>
        <input
          type="text"
          name="telefono"
          value={formData.telefono}
          onChange={handleChange}
          required
        />

        <label>Jornada laboral</label>
        <select name="horario" value={formData.horario} onChange={handleChange}>
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
