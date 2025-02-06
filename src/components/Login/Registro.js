import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../services/registerServices"; // Importar el servicio de registro
import "../../styles/Auth.css";

const Register = () => {
  const navigate = useNavigate();

  // Definir el estado para manejar los valores del formulario y los errores
  const [formData, setFormData] = useState({
    nombreCompleto: "",
    correoElectronico: "",
    password: "",
    ruc: "",  // Agregar el campo RUC aquí
    contacto: "", // Agregar el campo contacto aquí
  });

  const [error, setError] = useState(null);

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    console.log("Estado actual de formData:", formData); // Esto te muestra todos los valores
  
    if (
      !formData.nombreCompleto ||
      !formData.correoElectronico ||
      !formData.password ||
      !formData.ruc ||
      !formData.contacto
    ) {
      setError("Todos los campos son requeridos.");
      return;
    }
  
    try {
      const userData = {
        nombreCompleto: formData.nombreCompleto,
        correoElectronico: formData.correoElectronico,
        password: formData.password,
        ruc: formData.ruc,
        contacto: formData.contacto,
      };
  
      console.log("Datos a enviar:", userData); // Verifica los datos que se van a enviar
  
      await authService.register(userData);
      navigate('/login'); // Redirigir a login si el registro es exitoso
    } catch (error) {
      console.error("Error en la respuesta del servidor:", error);
      setError(error.message); // Mostrar el mensaje de error recibido
    }
  };
  

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="text-center mb-4">
          <img
            src={require("../../images/logo.png")}
            alt="Logo"
            className="auth-logo"
          />
        </div>

        <h2 className="text-center mb-4">Registro</h2>

        {/* Mostrar error si existe */}
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Nombre Completo
            </label>
            <input
              type="text"
              className="form-control"
              id="nombreCompleto"
              value={formData.nombreCompleto}
              onChange={handleChange}
              placeholder="Ingresa tu nombre"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Correo Electrónico
            </label>
            <input
              type="email"
              className="form-control"
              id="correoElectronico"
              value={formData.correoElectronico}
              onChange={handleChange}
              placeholder="Ingresa tu correo"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="ruc" className="form-label">
              RUC
            </label>
            <input
              type="text"
              className="form-control"
              id="ruc"
              value={formData.ruc}
              onChange={handleChange}
              placeholder="Ingresa tu RUC"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="contacto" className="form-label">
              Contacto
            </label>
            <input
              type="text"
              className="form-control"
              id="contacto"
              value={formData.contacto}
              onChange={handleChange}
              placeholder="Ingresa tu contacto"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Contraseña
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Ingresa tu contraseña"
            />
          </div>
        
          <button type="submit" className="btn btn-primary w-100 mb-3">
            Registrarse
          </button>
        </form>

        <div className="text-center">
          <span>¿Ya tienes una cuenta? </span>
          <Link to="/login" className="text-primary">
            Inicia Sesión
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
