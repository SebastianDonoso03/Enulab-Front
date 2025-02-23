import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useNavigate } from "react-router-dom";
import "../../src/styles/Sidebar.css"; // Asegúrate de tener este archivo de estilo CSS

const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Controla la apertura del menú "Menús"
  const [isCartasOpen, setIsCartasOpen] = useState(false); // Controla la apertura de "Cartas"
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false); // Controla la apertura del submenú de "Cartas" (Platos, Postres, Bebidas)
  
  const navigate = useNavigate(); // Hook para la navegación


  const toggleCartas = (e) => {
    e.preventDefault(); // Evita que el enlace cambie la página al hacer clic en el ícono
    setIsCartasOpen(!isCartasOpen);
    setIsSubMenuOpen(false); // Cierra el submenú de "Cartas" al cerrarse el menú
    navigate("/repertorio"); // Redirige a "Repertorio" cuando se hace clic en "Cartas"
  };


  return (
    <div className="layout-container">
      {/* Sidebar izquierdo */}
      <div className="sidebar">
        <ul className="sidebar-nav">
          {/* Enlaces principales */}
          <li>
            <Link to="/inicio">Inicio</Link>
          </li>
          <li>
            <Link to="/empleados">Empleados</Link>
          </li>
          <li>
            <Link to="/restaurantes">Restaurantes</Link>
          </li>
          <li>
            <Link to="/reservas">Reservas</Link>
          </li>
          <li>
            <Link to="/proveedores">Proveedores</Link>
          </li>
          <li>
            <Link to="/inventario">Inventario</Link>
          </li>
          <li>
            <Link to="/comentarios">Comentarios</Link>
          </li>

          {/* Menús */}
          <li
            onMouseEnter={() => setIsMenuOpen(true)} // Al pasar el mouse se abre "Menús"
            onMouseLeave={() => setIsMenuOpen(false)} // Al salir el mouse se cierra "Menús"
          >
            <div style={{ cursor: "pointer" }}>
              Menús
            </div>
            {isMenuOpen && (
              <ul className="sub-menu">
                {/* Cartas */}
                <li
                  onMouseEnter={() => setIsCartasOpen(true)} // Al pasar el mouse se abre "Cartas"
                  onMouseLeave={() => setIsCartasOpen(false)} // Al salir el mouse se cierra "Cartas"
                >
                  <Link to="#" onClick={toggleCartas}>
                    Cartas
                  </Link>
                  {isCartasOpen && (
                    <ul className="sub-sub-menu">
                      {/* Submenú de Cartas */}
                      <li>
                        <Link to="/platos">Platos</Link>
                      </li>
                      <li>
                        <Link to="/bebidas">Bebidas</Link>
                      </li>
                      <li>
                        <Link to="/postres">Postres</Link>
                      </li>
                    </ul>
                  )}
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>

      {/* Contenido Principal */}
      <div className="content">
        <Outlet /> {/* Aquí se renderizan los componentes hijos */}
      </div>
    </div>
  );
};

export default Layout;
