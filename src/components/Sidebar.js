import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Importa useNavigate
import "../styles/Sidebars.css";
import { FaSignOutAlt } from 'react-icons/fa';


const Sidebar = ({ isOpen }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartasOpen, setIsCartasOpen] = useState(false);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  
  const navigate = useNavigate(); // Inicializamos useNavigate

  const handleCartasClick = () => {
    setIsCartasOpen(!isCartasOpen);
    setIsSubMenuOpen(!isSubMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Elimina el token
    navigate("/login"); // Redirige al login
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
        <li onMouseEnter={() => setIsMenuOpen(true)} onMouseLeave={() => setIsMenuOpen(false)} className="menu-toggle">
          <div style={{ cursor: "pointer", color: "black", paddingLeft: "15px" }}>Menús</div>
          <ul className={`sub-menu ${isMenuOpen ? 'open' : ''}`}>
            <li onClick={handleCartasClick} className="sub-menu-toggle">
              <Link to="/repertorio">Cartas</Link>
              <ul className={`sub-sub-menu ${isSubMenuOpen ? 'open' : ''}`}>
                <li><Link to="/platos">Platos</Link></li>
                <li><Link to="/bebidas">Bebidas</Link></li>
                <li><Link to="/postres">Postres</Link></li>
              </ul>
            </li>
          </ul>
        </li>
        
        {/* Opción de Cerrar Sesión */}
        <li className="logout" onClick={handleLogout}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 20px", cursor: "pointer" }}>
            <span>Cerrar Sesión</span>
            <FaSignOutAlt />
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
