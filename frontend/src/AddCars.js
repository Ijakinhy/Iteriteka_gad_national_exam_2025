import React, { useState } from 'react';
import axios from 'axios';
function AddCars() {
  const [car, setCar] = useState({
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
    const response = await axios.post('http://localhost:4001/cars', car);
      setMessage('Car added successfully!');
      setCar({
        Type: '',
        Model: '',
        ManufacturingYear: '',
        DriverPhone: '',
        MechanicName: ''
      });
      console.log(response.data );
      
  } catch (err) {
    console.error(err); // helpful to debug
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