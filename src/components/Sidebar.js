import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";

const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Controla la apertura del menú "Menús"
  const [isCartasOpen, setIsCartasOpen] = useState(false); // Controla la apertura de "Cartas"

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) setIsCartasOpen(false); // Si se cierra "Menús", también se cierra "Cartas"
  };

  const toggleCartas = (e) => {
    e.preventDefault(); // Evita que el enlace cambie la página al hacer clic en el ícono
    setIsCartasOpen(!isCartasOpen);
  };

  return (
    <>
      {/* Navbar */}
      <Navbar bg="dark" variant="dark" expand="lg" className="p-3 fixed-top">
        <Container fluid>
          {/* Logo */}
          <Navbar.Brand href="/inicio" className="text-warning">
            <img
              src={require("../images/logo_enulab.png")}
              alt="Logo"
              width="70"
              height="60"
              className="d-inline-block align-top me-2"
            />
           
          </Navbar.Brand>

          {/* Botón para colapsar el menú en móviles */}
          <Navbar.Toggle aria-controls="navbar-nav" className="border-0">
            <i className="bi bi-list text-warning"></i>
          </Navbar.Toggle>

          {/* Menú colapsable */}
          <Navbar.Collapse id="navbar-nav">
            <Nav className="me-auto">
              {/* Restaurantes */}
              <Nav.Link href="/inicio" className="text-warning me-3">
                <i className="bi bi-plus-circle me-2"></i>
                Restaurantes
              </Nav.Link>

              {/* Reservas */}
              <Nav.Link as={Link} to="/Reservas" className="text-warning me-3">
                <i className="bi bi-calendar-check me-2"></i>
                Reservas
              </Nav.Link>

              {/* Empleados */}
              <Nav.Link as={Link} to="/empleados" className="text-warning me-3">
                <i className="bi bi-people me-2"></i>
                Empleados
              </Nav.Link>

              {/* Proveedores */}
              <Nav.Link as={Link} to="/Proveedores" className="text-warning me-3">
                <i className="bi bi-people me-2"></i>
                Proveedores
              </Nav.Link>

              {/* Inventario */}
              <Nav.Link as={Link} to="/Inventario" className="text-warning me-3">
                <i className="bi bi-people me-2"></i>
                Inventario
              </Nav.Link>

              {/* Menús */}
              <Nav.Item className="me-3">
                <Nav.Link
                  className="text-warning"
                  onClick={toggleMenu}
                  style={{ cursor: "pointer" }}
                >
                  <i className="bi bi-list me-2"></i>
                  Menús
                </Nav.Link>
                {isMenuOpen && (
                  <Nav className="flex-column ms-4">
                    {/* Cartas */}
                    <Nav.Item>
                      <div className="d-flex align-items-center">
                        <Nav.Link
                          as={Link}
                          to="/Repertorio"
                          className="text-warning flex-grow-1"
                        >
                          <i className="bi bi-list-ul me-2"></i>
                          Cartas
                        </Nav.Link>
                        <Button
                          variant="link"
                          className="text-warning p-0"
                          onClick={toggleCartas}
                        >
                          <i className={`bi ${isCartasOpen ? "bi-chevron-up" : "bi-chevron-down"}`}></i>
                        </Button>
                      </div>
                      {isCartasOpen && (
                        <Nav className="flex-column ms-4">
                          <Nav.Link as={Link} to="/Platos" className="text-warning">
                            <i className="bi bi-egg me-2"></i>
                            Platos
                          </Nav.Link>
                          <Nav.Link as={Link} to="/Bebidas" className="text-warning">
                            <i className="bi bi-cup-straw me-2"></i>
                            Bebidas
                          </Nav.Link>
                          <Nav.Link as={Link} to="/Postres" className="text-warning">
                            <i className="bi bi-cake me-2"></i>
                            Postres
                          </Nav.Link>
                        </Nav>
                      )}
                    </Nav.Item>
                  </Nav>
                )}
              </Nav.Item>
            </Nav>

            {/* Botón de Cerrar Sesión */}
            <Nav>
              <Nav.Link className="text-warning">
                <Button variant="outline-warning" onClick={() => alert("Cerrando sesión...")}>
                  <i className="bi bi-box-arrow-right me-2"></i>
                  Cerrar Sesión
                </Button>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Contenido Principal */}
      <div style={{ marginTop: "80px", padding: "20px" }}>
        <Outlet /> {/* Aquí se renderizan los componentes hijos */}
      </div>
    </>
  );
};

export default Layout;