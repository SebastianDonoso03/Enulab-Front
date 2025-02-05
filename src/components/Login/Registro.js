import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUser } from "../../services/loginServices";
import "../../styles/Auth.css";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombreCompleto: '',
    correoElectronico: '',
    password: '',
    ruc: '',
    contacto: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("nombreCompleto", formData.nombreCompleto);
    formDataToSend.append("correoElectronico", formData.correoElectronico);
    formDataToSend.append("password", formData.password);
    formDataToSend.append("ruc", formData.ruc);
    formDataToSend.append("contacto", formData.contacto);

    try {
      await createUser(formDataToSend);
      console.log('Usuario creado');
      navigate('/login');
    } catch (error) {
      console.error(error);
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

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="nombreCompleto" className="form-label">Nombre Completo</label>
            <input 
              type="text" 
              className="form-control" 
              id="nombreCompleto" 
              name="nombreCompleto" 
              placeholder="Ingresa tu nombre" 
              value={formData.nombreCompleto} 
              onChange={handleChange} 
            />
          </div>
          <div className="mb-3">
            <label htmlFor="correoElectronico" className="form-label">Correo Electrónico</label>
            <input 
              type="email" 
              className="form-control" 
              id="correoElectronico" 
              name="correoElectronico" 
              placeholder="Ingresa tu correo" 
              value={formData.correoElectronico} 
              onChange={handleChange} 
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input 
              type="password" 
              className="form-control" 
              id="password" 
              name="password" 
              placeholder="Ingresa tu contraseña" 
              value={formData.password} 
              onChange={handleChange} 
            />
          </div>
          <div className="mb-3">
            <label htmlFor="ruc" className="form-label">RUC</label>
            <input 
              type="number" 
              className="form-control" 
              id="ruc" 
              name="ruc" 
              placeholder="Ingresa tu número de RUC" 
              value={formData.ruc} 
              onChange={handleChange} 
            />
          </div>
          <div className="mb-3">
            <label htmlFor="contacto" className="form-label">Teléfono</label>
            <input 
              type="number" 
              className="form-control" 
              id="contacto" 
              name="contacto" 
              placeholder="Ingresa tu número de teléfono" 
              value={formData.contacto} 
              onChange={handleChange} 
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 mb-3">
            Registrarse
          </button>
        </form>

        <div className="text-center">
          <span>¿Ya tienes una cuenta? </span>
          <Link to="/Login" className="text-primary">Inicia Sesión</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
