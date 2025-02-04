import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/Auth.css";

const Register = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/login');
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

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Nombre Completo
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
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
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">
              Confirmar Contraseña
            </label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              placeholder="Confirma tu contraseña"
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 mb-3">
            Registrarse
          </button>
        </form>

        <div className="text-center">
          <span>¿Ya tienes una cuenta? </span>
          <Link to="/Login" className="text-primary">
            Inicia Sesión
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;