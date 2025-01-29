import React from "react";
import { Link } from "react-router-dom";

const Empleado = () => {
  const employees = [
    { id: 1, name: "José G. Vera", cedula: "715652348", edad: 24, genero: "Masculino", sueldo: "$460", horario: "11:00 AM - 09:00 PM" },
    { id: 2, name: "María López", cedula: "715652349", edad: 30, genero: "Femenino", sueldo: "$500", horario: "09:00 AM - 05:00 PM" }
  ];

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Empleados</h2>
        <Link to="/empleados/nuevo" className="btn btn-primary">Agregar empleado +</Link>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Cédula</th>
            <th>Edad</th>
            <th>Género</th>
            <th>Sueldo</th>
            <th>Horario</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={emp.id}>
              <td>{emp.name}</td>
              <td>{emp.cedula}</td>
              <td>{emp.edad}</td>
              <td>{emp.genero}</td>
              <td>{emp.sueldo}</td>
              <td>{emp.horario}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Empleado;
