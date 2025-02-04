import React from "react";
import { Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

const Sidebar = () => {
  return (
    <div
      className="sidebar text-white"
      style={{ width: "250px", minHeight: "100vh" }}
    >
      <div className="p-3">
        <h5 className="text-center mb-4">Navegación</h5>
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <Link className="nav-link text-white" to="/">
              <i className="bi bi-house-door me-2"></i>
              Inicio
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link className="nav-link text-white" to="/empleados">
              <i className="bi bi-people me-2"></i>
              Empleados
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link className="nav-link text-white" to="/restaurantes">
              <i className="bi bi-plus-circle me-2"></i>
              Restaurantes
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
