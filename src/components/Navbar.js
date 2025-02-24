import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbars from"../styles/Navbars.css"; // Asegúrate de importar el archivo de estilos adecuado
import { FaBars } from "react-icons/fa"; // Importamos el ícono de hamburguesa

const Navbar = ({ toggleSidebar }) => {
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
          {/* Icono de hamburguesa solo visible en pantallas pequeñas */}
          <button className="navbar-toggler" onClick={toggleSidebar}>
            <FaBars />
          </button>
          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
