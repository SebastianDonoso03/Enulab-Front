import React from "react";

const Dashboard = () => {
  return (
    <div className="p-4">
      <h2>Dashboard</h2>
      <div className="row mt-4">
        {/* Tarjeta 1: Ingresos Totales */}
        <div className="col-12 col-sm-6 col-md-3 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Ingresos Totales</h5>
              <p className="card-text">3,291,922</p>
            </div>
          </div>
        </div>

        {/* Tarjeta 2: Pedidos de hoy */}
        <div className="col-12 col-sm-6 col-md-3 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Pedidos de hoy</h5>
              <p className="card-text">290</p>
            </div>
          </div>
        </div>

        {/* Tarjeta 3: Vien Oeste */}
        <div className="col-12 col-sm-6 col-md-3 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Vien Oeste</h5>
              <p className="card-text">10</p>
            </div>
          </div>
        </div>

        {/* Tarjeta 4: Pedidos Pendientes */}
        <div className="col-12 col-sm-6 col-md-3 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Pedidos Pendientes</h5>
              <p className="card-text">100</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
