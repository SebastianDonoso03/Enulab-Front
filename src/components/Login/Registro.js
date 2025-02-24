import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import authService from "../../services/registerServices";
import "../../styles/Auth.css";  // Se mantiene Auth.css para ambos

const images = [
  require("../../images/image1.jpg"),
  require("../../images/image2.jpg"),
  require("../../images/image3.jpg"),
];

const pageVariants = {
  initial: { opacity: 0, x: 0 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, x: 0, transition: { duration: 0.3 } },
};

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
  const [passwordMessage, setPasswordMessage] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const rucRegex = /^\d{11}$/;

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));

    if (id === "password") {
      if (value.length < 8) {
        setPasswordMessage("La contraseña debe tener al menos 8 caracteres.");
      } else if (/^[a-zA-Z]+$/.test(value) || /^[0-9]+$/.test(value)) {
        setPasswordMessage("Contraseña muy débil (debe incluir letras y números). ");
      } else if (/^(?=.*[a-zA-Z])(?=.*[0-9])[A-Za-z0-9]+$/.test(value)) {
        setPasswordMessage("Contraseña medianamente segura (agrega símbolos). ");
      } else {
        setPasswordMessage("Contraseña segura.");
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
    if (!emailRegex.test(formData.correoElectronico)) {
      setError("El correo electrónico no es válido.");
      return;
    }
    if (!rucRegex.test(formData.ruc)) {
      setError("El RUC debe tener 11 dígitos numéricos.");
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
    <motion.div 
      className="auth-container"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      <div className="auth-background" style={{ backgroundImage: `url(${images[currentImage]})` }}></div>
      <div className="auth-content">
        <div className="auth-left">
          <h1 className="auth-title">Enulab</h1>
          <p className="auth-slogan">"El arte de crear es el arte de descubrir"</p>
        </div>
        <div className="auth-right">
          <div className="auth-card">
            <h2 className="text-center">Registro</h2>
            {error && <div className="text-center text-red-500" aria-live="polite">{error}</div>}
            <form onSubmit={handleSubmit}>
              {["nombreCompleto", "correoElectronico", "ruc", "contacto", "password"].map((id) => (
                <input 
                  key={id} 
                  type={id === "password" ? "password" : "text"} 
                  id={id} 
                  className="auth-input" 
                  value={formData[id]} 
                  onChange={handleChange} 
                  placeholder={id} 
                />
              ))}
              {passwordMessage && <p className="text-sm text-yellow-500">{passwordMessage}</p>}
              <label className="auth-checkbox">
                <input type="checkbox" checked={termsAccepted} onChange={() => setTermsAccepted(!termsAccepted)} />
                Acepto los <Link to="/terms" className="auth-link">términos y condiciones</Link>.
              </label>
              <div className="mt-1">
                <button type="submit" className="auth-button">Registrarse</button>
              </div>
            </form>
            <div className="text-center mt-1">
              <Link to="/login" className="auth-link">¿Ya tienes una cuenta? Inicia sesión</Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Register;
