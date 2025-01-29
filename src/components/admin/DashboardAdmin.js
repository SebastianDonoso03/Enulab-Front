import React from 'react';

const Dashboard = () => {
  return (
    <div className="p-4">
      <h2>Dashboard</h2>
      <div className="row mt-4">
        <div className="col-md-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Ingresos Totales</h5>
              <p className="card-text">3,291,922</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Pedidos de hoy</h5>
              <p className="card-text">290</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Vien Oeste</h5>
              <p className="card-text">10</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card">
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