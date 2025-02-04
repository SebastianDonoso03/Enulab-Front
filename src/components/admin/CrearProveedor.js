import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const CrearProveedor = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    producto:"",
    contacto: "",
    email: "",
    direccion: "",
    ciudad: "",
    provincia: "",
    
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Proveedor agregado:", formData);
    navigate("/Proveedores"); 
  };

  return (
    <div className="employee-container">
      <h2 className="employee-header">Creación de proveedor</h2>
      <form className="employee-form" onSubmit={handleSubmit}>
        <label>Nombre del proveedor</label>
        <input type="text" name="nombre" onChange={handleChange} required />

        <label>Producto</label>
        <input type="text" name="producto" onChange={handleChange} required />


        <label>Número de contacto</label>
        <input type="text" name="Número de contacto" onChange={handleChange} required />

        <label>Email</label>
        <input type="text" name="Email" onChange={handleChange} required />

        <label>Direccion</label>
        <input type="text" name="Direccion" onChange={handleChange} required />

        <label>Ciudad</label>
        <input type="number" name="Ciudad" onChange={handleChange} required />

        <label>Provincia</label>
        <input type="text" name="Provincia" onChange={handleChange} required />


        <div className="form-buttons">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/Proveedores")}
          >
            Atrás
          </button>
          <button type="submit" className="btn btn-primary">
            Continuar
          </button>
        </div>
      </form>
    </div>
  );
};

export default CrearProveedor;


