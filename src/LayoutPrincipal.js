import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

const LayoutPrincipal = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false); // Para saber si estamos en un dispositivo móvil

  // Verificar el tamaño de la pantalla
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsMobile(true); // Si la pantalla es pequeña, es móvil
      } else {
        setIsMobile(false); // Si la pantalla es grande, no es móvil
      }
    };

    handleResize(); // Verificar el tamaño de la pantalla al inicio
    window.addEventListener("resize", handleResize); // Verificar cambios de tamaño de la pantalla

    return () => window.removeEventListener("resize", handleResize); // Limpiar el evento al desmontar
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <Navbar toggleSidebar={toggleSidebar} /> {/* Pasamos el toggleSidebar al navbar */}
      <div style={{ display: "flex", height: "100vh" }}>
        <Sidebar isOpen={isMobile ? isSidebarOpen : true} /> {/* Si es móvil, usamos el estado; si no, siempre está abierto */}
        <div
          style={{
            marginTop: "70px",
            padding: "25px",
            paddingLeft: "17%",
            paddingRight:"2%",
            flex: 1,
            overflowY: "auto",
            background: "#E4E4E4FF",
          }}
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default LayoutPrincipal;
