import React from "react";
import "../../styles/Repertorio.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const menuItems = [
  {
    title: "Menú",
    image: "/images/sopas.jpg",
    viewPath: "/menu",
    addPath: "/CrearMenu", // Corregido para que apunte correctamente
  },
];

const Repertorio = () => {
  const navigate = useNavigate();

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Gestión de menú</h2>
      {menuItems.map((item, index) => (
        <div className="menu-item d-flex mb-3" key={index}>
          <div className="menu-image">
            <img src={item.image} alt={item.title} />
            <div className="overlay">
              <h3>{item.title}</h3>
            </div>
          </div>
          <div className="menu-description flex-grow-1">
            <p>
              Lorem ipsum dolor sit amet consectetur. A consequat tellus
              senectus posuere dolor lacus. Nunc ullamcorper netus donec massa
              nisi vitae ultricies porttitor. Penatibus quisque sed eget diam.
            </p>
          </div>
          <div className="menu-actions">
            <button
              className="btn btn-warning mb-2"
              onClick={() => navigate(item.addPath)} // Redirige correctamente a "/CrearMenu"
            >
              Agregar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Repertorio;
