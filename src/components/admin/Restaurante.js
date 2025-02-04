import React from "react";
import { Link } from "react-router-dom";
import "../../styles/Restaurantes.css";
import "../../images/logo.png";

const Restaurantes = () => {
  const restaurantes = [
    {
      id: 1,
      nombre: "Restaurante 1",
      tipoComida: "Comida rápida",
    },
    {
      id: 2,
      nombre: "Restaurante 2",
      tipoComida: "Comida italiana",
    },
    {
      id: 3,
      nombre: "Restaurante 3",
      tipoComida: "Comida mexicana",
    },
    {
      id: 4,
      nombre: "Restaurante 4",
      tipoComida: "Comida japonesa",
    },
  ];

  return (
    <div className="restaurantes-container min-vh-100 w-100">
      <h2 className="restaurantes-title">Mis restaurantes</h2>

      <div className="d-flex justify-content-end">
        <Link to="/crear-restaurantes" className="btn btn-primary">
          Agregar restaurante +
        </Link>
      </div>

      <div className="restaurantes-grid">
        {restaurantes.map((rest) => (
          <div key={rest.id} className="restaurante-card">
            <div className="restaurante-info">
              <img
                src={require("../../images/logo.png")}
                alt="Logo"
                className="restaurante-logo"
              />
              <h3>{rest.nombre}</h3>
              <p>{rest.tipoComida}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Restaurantes;
