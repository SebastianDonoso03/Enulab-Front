import React from "react";
import { Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

const Sidebar = () => {
  return (
    <div
      className="sidebar border-end"
      style={{ width: "250px", minHeight: "100vh" }}
    >
      <div className="p-3">
        <h5 className="text-center mb-4 text-white">Navegación</h5>
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
            <Link className="nav-link text-white" to="/crear-restaurantes">
              <i className="bi bi-people me-2"></i>
              Crear Restaurantes
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link className="nav-link text-white" to="/Visualizar">
              <i className="bi bi-people me-2"></i>
              Visualizar Restaurantes
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link className="nav-link text-white" to="/Proveedores">
              <i className="bi bi-people me-2"></i>
              Proveedores
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link className="nav-link text-white" to="/Inventario">
              <i className="bi bi-people me-2"></i>
              Inventario
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
