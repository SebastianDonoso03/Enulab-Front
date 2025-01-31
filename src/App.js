import "./App.css";
import React from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import "bootstrap/dist/css/bootstrap.min.css";
import Empleado from "./components/admin/Empleado";
import Dashboard from "./components/admin/DashboardAdmin";
import CrearEmpleado from "./components/admin/CrearEmpleado";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CrearRestaurante from "./components/admin/CrearRestaurant";
import VisualizarRestaurantes from "./components/admin/Visualizar";
import Proveedores from "./components/admin/Proveedores";
import CrearProveedor from "./components/admin/CrearProveedor";
import Inventario from "./components/admin/Inventario";
import CrearInventario from "./components/admin/CrearInventario";


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
            <Route path="/Visualizar" element={<VisualizarRestaurantes />} />
            <Route path="/Proveedores" element={<Proveedores />} />
            <Route path="/Proveedores/nuevo" element={<CrearProveedor />} />
            <Route path="/Inventario" element={<Inventario />} />
            <Route path="/Inventario/nuevo" element={<CrearInventario />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
