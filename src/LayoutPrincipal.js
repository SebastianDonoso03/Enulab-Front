import React from "react";
import Navbar from "./components/Navbar";  // Asegúrate de importar el Navbar correctamente
import Sidebar from "./components/Sidebar";  // Asegúrate de importar el Sidebar correctamente

const LayoutPrincipal = ({ children }) => (
  <>
    <Navbar />  {/* Navbar visible en todas las páginas protegidas */}
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar /> {/* Sidebar visible en todas las páginas protegidas */}
      <div style={{
        marginTop: "70px", // Ajuste para evitar que el contenido se cubra por el navbar
        padding: "20px",  // Espaciado en el contenido
        flex: 1,          // Esto hace que el contenido ocupe el espacio restante
        overflowY: "auto", 
        background: "#706f6f" // Permite que el contenido sea desplazable si excede el tamaño de la pantalla
      }}>
        {children} {/* Aquí se renderiza el contenido principal */}
      </div>
    </div>
  </>
);

export default LayoutPrincipal;
