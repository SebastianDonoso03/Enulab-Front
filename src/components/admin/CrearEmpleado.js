import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createEmployee } from "../../services/employeeServices";
import "../../styles/CrearEmpleado.css"; // Asegúrate de tener este archivo CSS

const CrearEmpleado = () => {
  const navigate = useNavigate();
  const [restaurantId, setRestaurantId] = useState(null);

  useEffect(() => {
    const storedRestaurantId = localStorage.getItem("selectedRestaurantId");
    console.log("ID del restaurante en localStorage:", storedRestaurantId);

    if (storedRestaurantId) {
      setRestaurantId(storedRestaurantId);
    } else {
      console.error("No se encontró el restaurantId en localStorage.");
      navigate("/restaurantes");
    }
  }, [navigate]);

  const [formData, setFormData] = useState({
    name: "",
    cedula: "",
    edad: "",
    genero: "",
    sueldo: "",
    telefono: "",
    horario: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === "edad" || name === "sueldo" ? (value ? parseInt(value, 10) : "") : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!restaurantId) {
      alert("Error: No se ha seleccionado un restaurante.");
      return;
    }

    try {
      const createdEmployee = await createEmployee(restaurantId, formData);
      console.log("Empleado creado:", createdEmployee);
      navigate("/empleados");
    } catch (error) {
      console.error("Error al crear el empleado:", error.response?.data || error.message);
      alert("Hubo un error al crear el empleado. Por favor, inténtalo de nuevo.");
    }
  };

  return (
    <div className="crear-empleado-container">
      <div className="crear-empleado-content">
        <div className="crear-empleado-card">
          <h2 className="text-center">Crear Empleado</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              className="crear-empleado-input"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nombre del Empleado"
              required
            />
            <input
              type="number"
              name="cedula"
              className="crear-empleado-input"
              value={formData.cedula}
              onChange={handleChange}
              placeholder="Número de Cédula"
              required
            />
            <input
              type="number"
              name="edad"
              className="crear-empleado-input"
              value={formData.edad}
              onChange={handleChange}
              placeholder="Edad"
              required
            />
            <select
              name="genero"
              className="crear-empleado-input"
              value={formData.genero}
              onChange={handleChange}
              required
            >
              <option value="No genero">Selecciona el género</option>
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
            </select>
            <input
              type="number"
              name="sueldo"
              className="crear-empleado-input"
              value={formData.sueldo}
              onChange={handleChange}
              placeholder="Sueldo"
              required
            />
            <input
              type="number"
              name="telefono"
              className="crear-empleado-input"
              value={formData.telefono}
              onChange={handleChange}
              placeholder="Número de Teléfono"
              required
            />
            <select
              name="horario"
              className="crear-empleado-input"
              value={formData.horario}
              onChange={handleChange}
              required
            >
              <option value="Sin jornada">Selecciona la Jornada</option>
              <option value="Matutina">Matutina (09:00 - 17:00)</option>
              <option value="Vespertina">Vespertina (12:00 - 17:00)</option>
              <option value="Nocturna">Nocturna (18:00 - 00:00)</option>
            </select>
            <div className="mt-4">
              <button type="submit" className="crear-empleado-button">Guardar Empleado</button>
            </div>
            <div className="text-center mt-4">
              <button type="button" className="crear-empleado-link" onClick={() => navigate("/empleados")}>Cancelar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CrearEmpleado;
