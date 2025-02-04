// src/pages/Proveedores.js
import React from "react";
import { Link } from "react-router-dom";

const Proveedores = () => {
  const employees = [
    {
      id: 1,
      name: "José G. Vera",
      contacto: "715652348",
      email: "jose@gmail.com",
      direccion: "Calderon",
      ciudad: "Quito",
      provincia: "Pichincha",
      producto: "carne",
    },
    {
      id: 2,
      name: "María López",
      contacto: "715652349",
      email: "maria@gmail.com",
      direccion: "ElInca",
      ciudad: "Quito",
      provincia: "Pichincha",
      producto: "vegetales",
    },
  ];

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Proveedores</h2>
        <Link to="/Proveedores/nuevo" className="btn btn-primary">
          Agregar proveeedor +
        </Link>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Contacto</th>
            <th>email</th>
            <th>direccion</th>
            <th>ciudad</th>
            <th>provincia</th>
            <th>Producto</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.name}</td>
              <td>{emp.contacto}</td>
              <td>{emp.direccion}</td>
              <td>{emp.email}</td>
              <td>{emp.ciudad}</td>
              <td>{emp.provincia}</td>
              <td>{emp.producto}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Proveedores;
