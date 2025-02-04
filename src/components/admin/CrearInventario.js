import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CrearInventario = () => {
  const [producto, setProducto] = useState({
    nombre: "",
    estado: false,
    cantidad: "",
    categoria: "",
    descripcion: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProducto({
      ...producto,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Producto agregado:", producto);
  };

  return (
    <div className="container mt-4 p-4 shadow rounded bg-light">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-primary">Crear Inventario</h2>
      </div>

      <form onSubmit={handleSubmit} className="p-3 border rounded bg-white">
        <div className="mb-3">
          <label className="form-label fw-bold">Nombre del Producto</label>
          <input type="text" className="form-control" name="nombre" value={producto.nombre} onChange={handleChange} required />
        </div>
        <div className="mb-3 d-flex align-items-center">
          <input type="checkbox" className="form-check-input me-2" name="estado" checked={producto.estado} onChange={handleChange} />
          <label className="form-label fw-bold">Disponible</label>
        </div>
        <div className="mb-3">
          <label className="form-label fw-bold">Cantidad</label>
          <input type="text" className="form-control" name="cantidad" value={producto.cantidad} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label fw-bold">Categoría</label>
          <input type="text" className="form-control" name="categoria" value={producto.categoria} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label fw-bold">Descripción</label>
          <textarea className="form-control" name="descripcion" value={producto.descripcion} onChange={handleChange} required></textarea>
        </div>

        <div className="d-flex justify-content-between">
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => navigate("/Inventario")}
          >
            Atrás
          </button>
          <button type="submit" className="btn btn-success">
            Guardar Producto
          </button>
        </div>
      </form>
    </div>
  );
};

export default CrearInventario;
