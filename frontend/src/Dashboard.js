import React from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div className="container mt-4">
      <h1 className="mb-4">CRPMS Dashboard</h1>
      <div className="row g-4">
        <div className="col-md-4">
          <div className="card text-bg-primary h-100">
            <div className="card-body">
              <h5 className="card-title">Services</h5>
              <p className="card-text">Add and view all available car services.</p>
              <Link to="/services" className="btn btn-light">Go to Services</Link>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-bg-success h-100">
            <div className="card-body">
              <h5 className="card-title">Cars</h5>
              <p className="card-text">Add new cars and view registered cars.</p>
              <Link to="/addcars" className="btn btn-light">Go to Cars</Link>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-bg-info h-100">
            <div className="card-body">
              <h5 className="card-title">Service Records</h5>
              <p className="card-text">Add and view all service records.</p>
              <Link to="/servicerecords" className="btn btn-light">Go to Records</Link>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-bg-warning h-100">
            <div className="card-body">
              <h5 className="card-title">Payments</h5>
              <p className="card-text">Add and view all payments.</p>
              <Link to="/payments" className="btn btn-light">Go to Payments</Link>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-bg-secondary h-100">
            <div className="card-body">
              <h5 className="card-title">Manage Payments</h5>
              <p className="card-text">Update or delete payment records.</p>
              <Link to="/optpayments" className="btn btn-light">Manage Payments</Link>
            </div>
          </div>
        </div>
      </div>
      {/* <hr className="my-4" /> */}
 {/* <h3 className="mt-5">Quick Reports</h3>
<ul className="list-group list-group-horizontal flex-wrap mb-4">
  <li className="list-group-item flex-fill text-center">
    <Link to="/services" className="text-decoration-none fw-bold">All Services Report</Link>
  </li>
  <li className="list-group-item flex-fill text-center">
    <Link to="/addcars" className="text-decoration-none fw-bold">All Cars Report</Link>
  </li>
  <li className="list-group-item flex-fill text-center">
    <Link to="/servicerecords" className="text-decoration-none fw-bold">All Service Records Report</Link>
  </li>
  <li className="list-group-item flex-fill text-center">
    <Link to="/payments" className="text-decoration-none fw-bold">All Payments Report</Link>
  </li>
</ul> */}
    </div>
  );
}

export default Dashboard;