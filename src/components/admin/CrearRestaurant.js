import React from "react";

const CrearRestaurante = () => {
  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">
            <i className="bi bi-plus-circle me-2"></i>
            Crear Restaurante
          </h4>
        </div>
        <div className="card-body">
          <form>
            <div className="mb-3">
              <label className="form-label">Nombre del Restaurante</label>
              <input type="text" className="form-control" />
            </div>
            <div className="mb-3">
              <label className="form-label">Tipo de Comida</label>
              <input type="text" className="form-control" />
            </div>
            <div className="mb-3">
              <label className="form-label">Descripción del Negocio</label>
              <textarea className="form-control"></textarea>
            </div>
            <div className="mb-3">
              <label className="form-label">Logo del Restaurante</label>
              <input type="file" className="form-control" />
            </div>
            <div className="d-flex justify-content-end">
              <button type="submit" className="btn btn-primary">
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CrearRestaurante;