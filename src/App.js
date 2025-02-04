import "./App.css";
import React from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Importa tus componentes
import Empleado from "./components/admin/Empleado";
import Inventario from "./components/admin/Inventario";
import Proveedores from "./components/admin/Proveedores";
import Dashboard from "./components/admin/DashboardAdmin";
import Restaurantes from "./components/admin/Restaurante";
import CrearEmpleado from "./components/admin/CrearEmpleado";
import CrearProveedor from "./components/admin/CrearProveedor";
import CrearInventario from "./components/admin/CrearInventario";
import CrearRestaurante from "./components/admin/CrearRestaurant";
import Login from "./components/Login/Login";
import Register from "./components/Login/Registro";

const LayoutPrincipal = ({ children }) => (
  <>
    <Navbar />
    <div className="d-flex">
      <Sidebar />
      <div className="content p-4">{children}</div>
    </div>
  </>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />
        <Route
          path="/Inicio"
          element={
            <LayoutPrincipal>
              <Dashboard />
            </LayoutPrincipal>
          }
        />
        <Route
          path="/empleados"
          element={
            <LayoutPrincipal>
              <Empleado />
            </LayoutPrincipal>
          }
        />
        <Route
          path="/empleados/nuevo"
          element={
            <LayoutPrincipal>
              <CrearEmpleado />
            </LayoutPrincipal>
          }
        />
        <Route
          path="/crear-restaurantes"
          element={
            <LayoutPrincipal>
              <CrearRestaurante />
            </LayoutPrincipal>
          }
        />
        <Route
          path="/restaurantes"
          element={
            <LayoutPrincipal>
              <Restaurantes />
            </LayoutPrincipal>
          }
        />
        <Route
          path="/Inventario"
          element={
            <LayoutPrincipal>
              <Inventario />
            </LayoutPrincipal>
          }
        />
        <Route
          path="/Inventario/nuevo"
          element={
            <LayoutPrincipal>
              <CrearInventario />
            </LayoutPrincipal>
          }
        />
        <Route
          path="/Proveedores"
          element={
            <LayoutPrincipal>
              <Proveedores />
            </LayoutPrincipal>
          }
        />
        <Route
          path="/Proveedores/nuevo"
          element={
            <LayoutPrincipal>
              <CrearProveedor />
            </LayoutPrincipal>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
