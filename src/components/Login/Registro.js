import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../services/registerServices";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/Styles.css"

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombreCompleto: "",
    correoElectronico: "",
    password: "",
    ruc: "",
    contacto: "",
  });
  const [error, setError] = useState(null);
  const [passwordStrength, setPasswordStrength] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));

    if (id === "password") {
      if (/^[a-zA-Z]+$/.test(value) || /^[0-9]+$/.test(value)) {
        setPasswordStrength("bg-danger text-white fw-bold p-1 rounded");
        setPasswordMessage("Contraseña insegura");
      } else if (/^(?=.*[a-zA-Z])(?=.*[0-9])[A-Za-z0-9]+$/.test(value)) {
        setPasswordStrength("bg-warning text-dark fw-bold p-1 rounded");
        setPasswordMessage("Contraseña medianamente segura");
      } else if (/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).+$/.test(value)) {
        setPasswordStrength("bg-success text-white fw-bold p-1 rounded");
        setPasswordMessage("Contraseña segura");
      } else {
        setPasswordStrength("");
        setPasswordMessage("");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!termsAccepted) {
      setError("Debes aceptar los términos y condiciones.");
      return;
    }
    if (Object.values(formData).some((value) => !value)) {
      setError("Todos los campos son requeridos.");
      return;
    }
    try {
      await authService.register(formData);
      navigate("/login");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-70 bg-dark text-light">
      <div className="card bg-secondary text-light p-4" style={{ width: "400px" }}>
        <div className="text-center mb-3">
          <img
            src={require("../../images/logo_enulab.png")}
            alt="Logo"
            className="img-fluid" style={{ width: "80px" }}
          />
        </div>
        <h2 className="text-center">Registro</h2>
        {error && <div className="alert alert-danger text-center">{error}</div>}
        <form onSubmit={handleSubmit}>
          {[
            { id: "nombreCompleto", label: "Nombre Completo", type: "text" },
            { id: "correoElectronico", label: "Correo Electrónico", type: "email" },
            { id: "ruc", label: "RUC", type: "text" },
            { id: "contacto", label: "Contacto", type: "text" },
            { id: "password", label: "Contraseña", type: "password" },
          ].map(({ id, label, type }) => (
            <div key={id} className="mb-3">
              <label htmlFor={id} className="form-label">{label}</label>
              <input
                type={type}
                id={id}
                value={formData[id]}
                onChange={handleChange}
                className="form-control"
                placeholder={`Ingresa tu ${label.toLowerCase()}`}
              />
              {id === "password" && <small className={`form-text ${passwordStrength}`}>{passwordMessage}</small>}
            </div>
          ))}
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="terms"
              checked={termsAccepted}
              onChange={() => setTermsAccepted(!termsAccepted)}
            />
            <label className="form-check-label" htmlFor="terms">
              Acepto los <span className="text-warning fw-bold" style={{ cursor: "pointer" }} data-bs-toggle="modal" data-bs-target="#termsModal">términos y condiciones</span>
            </label>
          </div>
          <button type="submit" className="btn btn-warning w-100">Registrarse</button>
        </form>
        <div className="text-center mt-3">
          <span>¿Ya tienes una cuenta? </span>
          <Link to="/login" className="text-warning fw-bold">Inicia Sesión</Link>
        </div>
      </div>

      <div className="modal fade" id="termsModal" tabIndex="-1" aria-labelledby="termsModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="termsModalLabel">Términos y Condiciones</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              Aquí van los términos y condiciones...
              
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
