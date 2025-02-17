import React, { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

const Sidebar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Controla la apertura del menú "Menús"
  const [isCartasOpen, setIsCartasOpen] = useState(false); // Controla la apertura de "Cartas"

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) setIsCartasOpen(false); // Si se cierra "Menús", también se cierra "Cartas"
  };

  const toggleCartas = (e) => {
    e.preventDefault(); // Evita que el enlace cambie la página al hacer clic en el ícono
    setIsCartasOpen(!isCartasOpen);
  };

  return (
    <div className="sidebar text-white" style={{ width: "250px", minHeight: "100vh" }}>
      <div className="p-3">
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <button
              className="nav-link text-white btn btn-link w-100 text-start"
              onClick={() => (window.location.href = "/inicio")}
              style={{ backgroundColor: "transparent", border: "none" }}
            >
              <i className="bi bi-plus-circle me-2"></i>
              Restaurantes
            </button>
          </li>
          <li className="nav-item mb-2">
            <Link className="nav-link text-white" to="/Reservas">
              <i className="bi bi-calendar-check me-2"></i>
              Reservas
            </Link>
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
          <li className="nav-item mb-2">
            <Link className="nav-link text-white" to="/Comentarios">
              <i className="bi bi-people me-2"></i>
              Comentario
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
              Menús
            </button>
            {isMenuOpen && (
              <ul className="nav flex-column ms-3">
                {/* Subapartado Cartas */}
                <li className="nav-item mb-2">
                  <div className="d-flex align-items-center">
                    <Link className="nav-link text-white flex-grow-1" to="/Repertorio">
                      <i className="bi bi-list-ul me-2"></i>
                      Cartas
                    </Link>
                    <button
                      className="btn btn-link text-white"
                      onClick={toggleCartas}
                      style={{ backgroundColor: "transparent", border: "none" }}
                    >
                      <i className={`bi ${isCartasOpen ? "bi-chevron-up" : "bi-chevron-down"}`}></i>
                    </button>
                  </div>
                  {isCartasOpen && (
                    <ul className="nav flex-column ms-3">
                      <li className="nav-item mb-2">
                        <Link className="nav-link text-white" to="/Platos">
                          <i className="bi bi-egg me-2"></i>
                          Platos
                        </Link>
                      </li>
                      <li className="nav-item mb-2">
                        <Link className="nav-link text-white" to="/Bebidas">
                          <i className="bi bi-cup-straw me-2"></i>
                          Bebidas
                        </Link>
                      </li>
                      <li className="nav-item mb-2">
                        <Link className="nav-link text-white" to="/Postres">
                          <i className="bi bi-cake me-2"></i>
                          Postres
                        </Link>
                      </li>
                    </ul>
                  )}
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
