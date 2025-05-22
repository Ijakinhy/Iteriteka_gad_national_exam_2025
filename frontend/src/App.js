import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './NavBar';
import AddServiceForm from './AddServiceForm';
import AddCars from './AddCars';
import Payement from './Payement';
import ServiceRecord from './ServiceRecord';
import OptPayments from './OptPayments';
import Dashboard from './Dashboard';
import Register from './Register';
import Login from './Login';

import './App.css';

function Services() {
  return (
    <div>
      <h2>Services</h2>
      <AddServiceForm />
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* No NavBar for Register and Login */}
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          {/* NavBar for all other routes */}
          <Route
            path="*"
            element={
              <>
                <NavBar />
                <div className="container mt-4">
                  <Routes>
                    <Route path="/services" element={<Services />} />
                    <Route path="/addcars" element={<AddCars />} />
                    <Route path="/servicerecords" element={<ServiceRecord />} />
                    <Route path="/payments" element={<Payement />} />
                    <Route path="/optpayments" element={<OptPayments />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="*" element={<div>404 Not Found</div>} />
                  </Routes>
                </div>
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;