import React, { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

const Sidebar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);  // Controla la apertura del menú

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);  // Cambia el estado de apertura del menú
  };

  return (
    <div
      className="sidebar text-white"
      style={{ width: "250px", minHeight: "100vh" }}
    >
      <div className="p-3">
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <button
              className="nav-link text-white btn btn-link w-100 text-start"
              onClick={() => (window.location.href = "/restaurantes")}
              style={{ backgroundColor: "transparent", border: "none" }}
            >
              <i className="bi bi-plus-circle me-2"></i>
              Restaurantes
            </button>
          </li>
          <li className="nav-item mb-2">
            <Link className="nav-link text-white" to="/empleados">
              <i className="bi bi-people me-2"></i>
              Empleados
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

          {/* Menú con subapartados */}
          <li className="nav-item mb-2">
            <button
              className="nav-link text-white btn btn-link w-100 text-start"
              onClick={toggleMenu}
              style={{ backgroundColor: "transparent", border: "none" }}
            >
              <i className="bi bi-list me-2"></i>
              Menú
            </button>
            {isMenuOpen && (
              <ul className="nav flex-column ms-3">
                {/* Subapartado Repertorio */}
                <li className="nav-item mb-2">
                  <Link className="nav-link text-white" to="/repertorio">
                    <i className="bi bi-list-ul me-2"></i>
                    Repertorio
                  </Link>
                </li>

                {/* Subapartado Platos */}
                <li className="nav-item mb-2">
                  <Link className="nav-link text-white" to="/platos">
                    <i className="bi bi-egg me-2"></i>
                    Platos
                  </Link>
                </li>

                {/* Subapartado Bebidas */}
                <li className="nav-item mb-2">
                  <Link className="nav-link text-white" to="/bebidas">
                    <i className="bi bi-cup-straw me-2"></i>
                    Bebidas
                  </Link>
                </li>

                {/* Subapartado Postres */}
                <li className="nav-item mb-2">
                  <Link className="nav-link text-white" to="/postres">
                    <i className="bi bi-cake me-2"></i>
                    Postres
                  </Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
