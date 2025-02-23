import "./App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// Importa tus componentes
import Empleado from "./components/admin/Empleado";
import Inventario from "./components/admin/Inventario";
import Proveedores from "./components/admin/Proveedores";
import Restaurantes from "./components/admin/Restaurante";
import CrearEmpleado from "./components/admin/CrearEmpleado";
import CrearProveedor from "./components/admin/CrearProveedor";
import CrearInventario from "./components/admin/CrearInventario";
import CrearRestaurante from "./components/admin/CrearRestaurant";
import Comentario from "./components/admin/Comentario";
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
import LayoutPrincipal from "./LayoutPrincipal"; 

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Rutas públicas */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />

        {/* Rutas protegidas (requieren navegación con LayoutPrincipal) */}
        <Route path="/inicio" element={<LayoutPrincipal><Restaurantes /></LayoutPrincipal>} />
        <Route path="/empleados" element={<LayoutPrincipal><Empleado /></LayoutPrincipal>} />
        <Route path="/empleados/nuevo" element={<LayoutPrincipal><CrearEmpleado /></LayoutPrincipal>} />
        <Route path="/restaurantes" element={<LayoutPrincipal><Restaurantes /></LayoutPrincipal>} />
        <Route path="/inventario" element={<LayoutPrincipal><Inventario /></LayoutPrincipal>} />
        <Route path="/inventario/nuevo" element={<LayoutPrincipal><CrearInventario /></LayoutPrincipal>} />
        <Route path="/proveedores" element={<LayoutPrincipal><Proveedores /></LayoutPrincipal>} />
        <Route path="/proveedores/nuevo" element={<LayoutPrincipal><CrearProveedor /></LayoutPrincipal>} />
        <Route path="/platos" element={<LayoutPrincipal><Platos /></LayoutPrincipal>} />
        <Route path="/bebidas" element={<LayoutPrincipal><Bebidas /></LayoutPrincipal>} />
        <Route path="/postres" element={<LayoutPrincipal><Postres /></LayoutPrincipal>} />
        <Route path="/crear-postre" element={<LayoutPrincipal><CrearPostre /></LayoutPrincipal>} />
        <Route path="/crear-bebida" element={<LayoutPrincipal><CrearBebida /></LayoutPrincipal>} />
        <Route path="/crear-plato" element={<LayoutPrincipal><CrearPlato /></LayoutPrincipal>} />
        <Route path="/repertorio" element={<LayoutPrincipal><Repertorio /></LayoutPrincipal>} />
        <Route path="/crear-menu" element={<LayoutPrincipal><CrearMenu /></LayoutPrincipal>} />
        <Route path="/reservas" element={<LayoutPrincipal><Reservas /></LayoutPrincipal>} />
        <Route path="/crear-reservas" element={<LayoutPrincipal><CrearReservas /></LayoutPrincipal>} />
        <Route path="/comentarios" element={<LayoutPrincipal><Comentario /></LayoutPrincipal>} />
        <Route path="/crear-restaurantes" element={<CrearRestaurante />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
