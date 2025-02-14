import "./App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Importa tus componentes
import Empleado from "./components/admin/Empleado";
import Inventario from "./components/admin/Inventario";
import Proveedores from "./components/admin/Proveedores";
import Restaurantes from "./components/admin/Restaurante";
import CrearEmpleado from "./components/admin/CrearEmpleado";
import CrearProveedor from "./components/admin/CrearProveedor";
import CrearInventario from "./components/admin/CrearInventario";
import CrearRestaurante from "./components/admin/CrearRestaurant";
import Login from "./components/Login/Login";
import Register from "./components/Login/Registro";
import Platos from "./components/admin/Platos";
import Bebidas from "./components/admin/Bebidas";
import Postres from "./components/admin/Postre";
import CrearPostre from "./components/admin/CrearPostre";
import CrearBebida from "./components/admin/CrearBebida";
import CrearPlato from "./components/admin/CrearPlato";
import Repertorio from "./components/admin/Repertorio";
import CrearMenu from "./components/admin/CrearMenu";
import CrearReservas from "./components/admin/CrearReserva";
import Reservas from "./components/admin/Reservas";
import LayoutPrincipal from "./LayoutPrincipal"; // Importa el nuevo LayoutPrincipal

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />
        <Route path="/Inicio" element={<Restaurantes />} />
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
        <Route
          path="/Platos"
          element={
            <LayoutPrincipal>
              <Platos />
            </LayoutPrincipal>
          }
        />
        <Route
          path="/Bebidas"
          element={
            <LayoutPrincipal>
              <Bebidas />
            </LayoutPrincipal>
          }
        />
        <Route
          path="/Postres"
          element={
            <LayoutPrincipal>
              <Postres />
            </LayoutPrincipal>
          }
        />
        <Route
          path="/Crear-Postre"
          element={
            <LayoutPrincipal>
              <CrearPostre />
            </LayoutPrincipal>
          }
        />
        <Route
          path="/Crear-Bebida"
          element={
            <LayoutPrincipal>
              <CrearBebida />
            </LayoutPrincipal>
          }
        />
        <Route
          path="/Crear-Plato"
          element={
            <LayoutPrincipal>
              <CrearPlato />
            </LayoutPrincipal>
          }
        />
        <Route
          path="/Repertorio"
          element={
            <LayoutPrincipal>
              <Repertorio />
            </LayoutPrincipal>
          }
        />
        <Route
          path="/CrearMenu"
          element={
            <LayoutPrincipal>
              <CrearMenu />
            </LayoutPrincipal>
          }
        />
        <Route
          path="/Reservas"
          element={
            <LayoutPrincipal>
              <Reservas />
            </LayoutPrincipal>
          }
        />
        <Route
          path="/CrearReservas"
          element={
            <LayoutPrincipal>
              <CrearReservas />
            </LayoutPrincipal>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;