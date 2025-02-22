import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import loginService from "../../services/loginServices";
import "../../styles/Auth.css";

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

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ correoElectronico: "", password: "" });
  const [error, setError] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.correoElectronico || !formData.password) {
      setError("Todos los campos son requeridos.");
      return;
    }
    try {
      await loginService.login(formData.correoElectronico, formData.password);
      navigate("/inicio");
    } catch (error) {
      setError("Credenciales incorrectas");
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
            <h2 className="text-center">Inicio de Sesión</h2>
            {error && <div className="text-center text-red-500">{error}</div>}
            <form onSubmit={handleSubmit}>
              <input type="email" id="correoElectronico" className="auth-input" value={formData.correoElectronico} onChange={handleChange} placeholder="Correo Electrónico" />
              <input type="password" id="password" className="auth-input" value={formData.password} onChange={handleChange} placeholder="Contraseña" />
              <button type="submit" className="auth-button">Iniciar Sesión</button>
            </form>
            <div className="text-center mt-4">
              <Link to="/registro" className="auth-link">¿No tienes una cuenta? Regístrate</Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Login;
