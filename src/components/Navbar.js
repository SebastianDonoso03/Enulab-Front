import React from "react";
import "../styles/Img.css";
import "../styles/Home.css";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-md navbar">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <img
            src={require("../images/logo.png")}
            alt="Logo"
            className="img-logo"
          />
        </a>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link" href="#">
                Dashboard
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Configuración
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Cerrar Sesión
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
