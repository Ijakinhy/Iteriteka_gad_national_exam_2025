import React, { useState } from 'react';
import { addService } from './services';

function AddServiceForm() {
  const [service, setService] = useState({
    ServiceCode: '',
    ServiceName: '',
    ServicePrice: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setService({ ...service, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      await addService({
        ...service,
        ServicePrice: parseFloat(service.ServicePrice)
      });
      setMessage('Service added successfully!');
      setService({ ServiceCode: '', ServiceName: '', ServicePrice: '' });
    } catch (err) {
      setMessage('Failed to add service');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 p-4 border rounded bg-light">
      <h3 className="mb-3">Add New Service</h3>
      {message && (
        <div className={`alert ${message.includes('successfully') ? 'alert-success' : 'alert-danger'}`} role="alert">
          {message}
        </div>
      )}
      <div className="mb-3">
        <label className="form-label">Service Code</label>
        <input
          type="text"
          className="form-control"
          name="ServiceCode"
          value={service.ServiceCode}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Service Name</label>
        <input
          type="text"
          className="form-control"
          name="ServiceName"
          value={service.ServiceName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Service Price</label>
        <input
          type="number"
          step="0.01"
          className="form-control"
          name="ServicePrice"
          value={service.ServicePrice}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">Add Service</button>
    </form>
  );
}

export default AddServiceForm;