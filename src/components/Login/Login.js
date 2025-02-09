import React from "react";
import { Link } from "react-router-dom";
import "../../styles/Auth.css";

const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.href = "/Restaurantes";
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
            <label htmlFor="email" className="form-label">
              Correo Electrónico
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
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
