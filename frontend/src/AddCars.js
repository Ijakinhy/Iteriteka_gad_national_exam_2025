import React, { useState } from 'react';

function AddCars({ onCarAdded }) {
  const [car, setCar] = useState({
    PlateNumber: '',
    Type: '',
    Model: '',
    ManufacturingYear: '',
    DriverPhone: '',
    MechanicName: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setCar({ ...car, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      // Replace with your backend API call
      const response = await fetch('http://localhost:3001/cars', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(car),
      });
      if (!response.ok) throw new Error('Failed to add car');
      setMessage('Car added successfully!');
      setCar({
        PlateNumber: '',
        Type: '',
        Model: '',
        ManufacturingYear: '',
        DriverPhone: '',
        MechanicName: ''
      });
      if (onCarAdded) onCarAdded();
    } catch (err) {
      setMessage('Failed to add car');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 p-4 border rounded bg-light">
      <h3 className="mb-3">Add New Car</h3>
      {message && (
        <div className={`alert ${message.includes('successfully') ? 'alert-success' : 'alert-danger'}`} role="alert">
          {message}
        </div>
      )}
      <div className="mb-3">
        <label className="form-label">Plate Number</label>
        <input
          type="text"
          className="form-control"
          name="PlateNumber"
          value={car.PlateNumber}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Type</label>
        <input
          type="text"
          className="form-control"
          name="Type"
          value={car.Type}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Model</label>
        <input
          type="text"
          className="form-control"
          name="Model"
          value={car.Model}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Manufacturing Year</label>
        <input
          type="number"
          className="form-control"
          name="ManufacturingYear"
          value={car.ManufacturingYear}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Driver Phone</label>
        <input
          type="text"
          className="form-control"
          name="DriverPhone"
          value={car.DriverPhone}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Mechanic Name</label>
        <input
          type="text"
          className="form-control"
          name="MechanicName"
          value={car.MechanicName}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">Add Car</button>
    </form>
  );
}

export default AddCars;