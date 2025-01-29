import React from "react";

const VisualizarRestaurantes = () => {
  const restaurantes = [
    { id: 1, nombre: "Restaurante A", tipoComida: "Italiana", descripcion: "Comida italiana tradicional." },
    { id: 2, nombre: "Restaurante B", tipoComida: "Mexicana", descripcion: "Auténtica comida mexicana." },
  ];

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">
            <i className="bi bi-eye me-2"></i>
            Visualizar Restaurantes
          </h4>
        </div>
        <div className="card-body">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Tipo de Comida</th>
                <th>Descripción</th>
              </tr>
            </thead>
            <tbody>
              {restaurantes.map((rest) => (
                <tr key={rest.id}>
                  <td>{rest.nombre}</td>
                  <td>{rest.tipoComida}</td>
                  <td>{rest.descripcion}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default VisualizarRestaurantes;