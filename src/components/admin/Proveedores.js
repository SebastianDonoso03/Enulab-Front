// src/pages/Proveedores.js
import React, { useState } from "react";
import { Link } from "react-router-dom";


const Proveedores = () => {
  const employees = [
    { id: 1, name: "José G. Vera", contacto: "715652348", producto: "carne" },
    { id: 2, name: "María López", contacto: "715652349", producto: "vegetales" }
  ];

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Proveedores</h2>
        <Link to="/Proveedores/nuevo" className="btn btn-primary">Agregar proveeedor +</Link>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Contacto</th>
            <th>Producto</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={emp.id}>
              <td>{emp.name}</td>
              <td>{emp.contacto}</td>
              <td>{emp.producto}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Proveedores;