import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginService from "../../services/loginServices"; // Importar el servicio de login
import "../../styles/Auth.css";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    correoElectronico: "",
    password: "",
  });

  const [error, setError] = useState(null);

  // Manejar los cambios en los campos de entrada
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!formData.correoElectronico || !formData.password) {
      setError("Todos los campos son requeridos.");
      return;
    }
  
    try {
      const response = await loginService.login(formData.correoElectronico, formData.password);
      console.log("Respuesta del servidor:", response);
  
      // Redirigir a la página de inicio o dashboard
      navigate("/inicio");
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setError(error.message); // Mostrar el mensaje de error
    }
  };

  return (
    <div className="auth-container d-flex justify-content-center align-items-center vh-100 bg-dark text-light">
      <div className="auth-card bg-secondary text-light p-5 rounded shadow-lg" style={{ width: "400px" }}>
        <div className="text-center mb-4">
          <img
            src={require("../../images/logo_enulab.png")}
            alt="Logo"
            className="auth-logo img-fluid"
            style={{ width: "80px" }}
          />
        </div>

        <h2 className="text-center mb-4">Iniciar Sesión</h2>

        {/* Mostrar error si existe */}
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="correoElectronico" className="form-label">Correo Electrónico</label>
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
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Ingresa tu contraseña"
            />
          </div>
          <button type="submit" className="btn btn-warning w-100 mb-3">Iniciar Sesión</button>
        </form>

        <div className="text-center">
          <span>¿No tienes una cuenta? </span>
          <Link to="/registro" className="text-warning fw-bold">Regístrate</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
