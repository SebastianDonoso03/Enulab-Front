import React, { useState } from "react";
import { Link } from "react-router-dom";

const Inventario = () => {
  const productos = [
    { id: 1, nombre: "Carne de res", estado: true, cantidad: "50 kg", categoria: "Carnes", descripcion: "Carne de res fresca" },
    { id: 2, nombre: "Lechuga", estado: false, cantidad: "30 unidades", categoria: "Vegetales", descripcion: "Lechuga romana orgánica" }
  ];

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Inventario</h2>
        <Link to="/Inventario/nuevo" className="btn btn-primary">Agregar producto +</Link>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Estado</th>
            <th>Cantidad</th>
            <th>Categoría</th>
            <th>Descripción</th>
          </tr>
        </thead>
        <tbody>
          {productos.map(prod => (
            <tr key={prod.id}>
              <td>{prod.nombre}</td>
              <td>{prod.estado ? "Disponible" : "No disponible"}</td>
              <td>{prod.cantidad}</td>
              <td>{prod.categoria}</td>
              <td>{prod.descripcion}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Inventario;