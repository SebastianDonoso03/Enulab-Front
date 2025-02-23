import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css"; // Asegúrate de importar el archivo de estilos adecuado

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container-fluid">
        {/* Logo */}
        <Link className="navbar-brand" to="/">
          <img
            src={require("../images/logo.png")}
            alt="Logo"
            className="img-logo"
          />
        </Link>

        {/* Menú de navegación */}
        <div className="d-flex ms-auto">
          <Link className="nav-link" to="/login">
            Cerrar Sesión
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
