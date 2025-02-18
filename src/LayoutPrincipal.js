import React from "react";
import Navbar from "./components/Sidebar"; // Importa el nuevo Navbar

const LayoutPrincipal = ({ children }) => (
  <>
    <Navbar /> {/* Nuevo Navbar */}
    <div style={{ marginTop: "80px", padding: "20px" }}>{children}</div>
  </>
);

export default LayoutPrincipal;