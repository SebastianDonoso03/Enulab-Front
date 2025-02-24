import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Sidebars.css"; // Asegúrate de tener este archivo de estilo CSS

const Sidebar = ({ isOpen }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartasOpen, setIsCartasOpen] = useState(false);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false); // Nuevo estado para manejar el submenú

  const handleCartasClick = () => {
    setIsCartasOpen(!isCartasOpen); // Alterna la visibilidad de las opciones de cartas
    setIsSubMenuOpen(!isSubMenuOpen); // Alterna la visibilidad de los submenús (Platos, Bebidas, Postres)
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <ul className="sidebar-nav">
        <li><Link to="/inicio">Inicio</Link></li>
        <li><Link to="/empleados">Empleados</Link></li>
        <li><Link to="/restaurantes">Restaurantes</Link></li>
        <li><Link to="/reservas">Reservas</Link></li>
        <li><Link to="/proveedores">Proveedores</Link></li>
        <li><Link to="/inventario">Inventario</Link></li>
        <li><Link to="/comentarios">Comentarios</Link></li>

        {/* Menús */}
        <li
          onMouseEnter={() => setIsMenuOpen(true)}
          onMouseLeave={() => setIsMenuOpen(false)}
          className="menu-toggle"
        >
          <div style={{ cursor: "pointer", color: "black", paddingLeft: "15px" }}>
            Menús
          </div>
          <ul className={`sub-menu ${isMenuOpen ? 'open' : ''}`}>
            {/* Cartas */}
            <li
              onClick={handleCartasClick} // Cambié a onClick para abrir y cerrar el submenú de Cartas
              className="sub-menu-toggle"
            >
              <Link to="/repertorio">Cartas</Link>
              {/* Submenú de Platos, Bebidas y Postres */}
              <ul className={`sub-sub-menu ${isSubMenuOpen ? 'open' : ''}`}>
                <li><Link to="/platos">Platos</Link></li>
                <li><Link to="/bebidas">Bebidas</Link></li>
                <li><Link to="/postres">Postres</Link></li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
