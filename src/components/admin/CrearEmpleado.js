import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createEmployee } from "../../services/employeeServices";

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
    <div className="container d-flex justify-content-center align-items-center min-vh-100" style={{ color: "gold" }}>
      <div className="card p-4 shadow-lg" style={{ maxWidth: "600px", width: "100%", borderRadius: "15px", backgroundColor: "#222", border: "2px solid gold" }}>

        <h2 className="text-center mb-4" style={{ color: "gold" }}>Crear Empleado</h2>


        <form onSubmit={handleSubmit} >
          {/* Nombre */}
          <div className="mb-3">
            <label className="form-label ">Nombre del empleado</label>
            <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required />
          </div>

          {/* Cédula */}
          <div className="mb-3">
            <label className="form-label ">Número de cédula</label>
            <input type="text" className="form-control" name="cedula" value={formData.cedula} onChange={handleChange} required />
          </div>

          {/* Edad */}
          <div className="mb-3">
            <label className="form-label ">Edad</label>
            <input type="number" className="form-control" name="edad" value={formData.edad} onChange={handleChange} required />
          </div>

          {/* Género */}
          <div className="mb-3">
            <label className="form-label">Género</label>
            <select className="form-select" name="genero" value={formData.genero} onChange={handleChange} required>
              <option value="No genero">Selecciona el género</option>
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
            </select>
          </div>

          {/* Sueldo */}
          <div className="mb-3">
            <label className="form-label fw-bold">Sueldo</label>
            <input type="number" className="form-control" name="sueldo" value={formData.sueldo} onChange={handleChange} required />
          </div>

          {/* Teléfono */}
          <div className="mb-3">
            <label className="form-label fw-bold">Número de teléfono</label>
            <input type="text" className="form-control" name="telefono" value={formData.telefono} onChange={handleChange} required />
          </div>

          {/* Jornada Laboral */}
          <div className="mb-3">
            <label className="form-label fw-bold">Jornada laboral</label>
            <select className="form-select" name="horario" value={formData.horario} onChange={handleChange} required>
            <option value="Sin jornada">Selecciona la Jornada</option>
              <option value="Matutina">Matutina (09:00 - 17:00)</option>
              <option value="Vespertina">Vespertina (12:00 - 17:00)</option>
              <option value="Nocturna">Nocturna (18:00 - 00:00)</option>
            </select>
          </div>

          {/* Botones */}
          <div className="d-flex justify-content-between">
            <button type="button" className="btn btn-secondary" onClick={() => navigate("/empleados")}>
              Atrás
            </button>
            <button type="submit" className="btn btn-warning text-dark">
              Guardar Empleado
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CrearEmpleado;
