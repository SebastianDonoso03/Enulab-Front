import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/Auth.css";
import { loginUser } from "../../services/loginServices";

const Login = () => {
  const [formData, setFormData] = useState({
    correoelectronico: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState(""); // Estado para el mensaje de error

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage(""); // Limpiar mensaje previo

    loginUser(formData)
      .then(() => {
        window.location.href = "/restaurantes"; // Redirigir después de iniciar sesión
      })
      .catch((error) => {
        setErrorMessage(error.message || "Error en el inicio de sesión, revisa tus credenciales");
      });
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

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="correoelectronico" className="form-label">
              Correo Electrónico
            </label>
            <input
              type="email"
              className="form-control"
              id="correoelectronico"
              name="correoelectronico"
              value={formData.correoelectronico}
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
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Ingresa tu contraseña"
            />
          </div>

          {/* Mostrar mensaje de error si existe */}
          {errorMessage && <p className="text-danger">{errorMessage}</p>}

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
