import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
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
    <div className="auth-container">
      <div className="auth-card">
        <div className="text-center mb-4">
          <img
            src={require("../../images/logo.png")}
            alt="Logo"
            className="auth-logo"
          />
        </div>

        <h2 className="text-center mb-4">Iniciar Sesión</h2>

        {/* Mostrar error si existe */}
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
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
            Iniciar Sesión
          </button>
        </form>

        <div className="text-center">
          <span>¿No tienes una cuenta? </span>
          <Link to="/registro" className="text-primary">
            Regístrate
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
