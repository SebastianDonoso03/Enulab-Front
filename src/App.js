import "./App.css";
import React from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import "bootstrap/dist/css/bootstrap.min.css";
import Empleado from "./components/admin/Empleado";
import Dashboard from "./components/admin/DashboardAdmin";
import Restaurantes from "./components/admin/Restaurante";
import CrearEmpleado from "./components/admin/CrearEmpleado";
import CrearRestaurante from "./components/admin/CrearRestaurant";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="d-flex">
        <Sidebar />
        <div className="content p-4">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/empleados" element={<Empleado />} />
            <Route path="/empleados/nuevo" element={<CrearEmpleado />} />
            <Route path="/crear-restaurantes" element={<CrearRestaurante />} />
            <Route path="/restaurantes" element={<Restaurantes />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
