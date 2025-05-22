import React, { useState, useEffect } from 'react';

function ServiceRecord({ onRecordAdded }) {
  const [record, setRecord] = useState({
    PlateNumber: '',
    ServiceCode: '',
    ServiceDate: ''
  });
  const [message, setMessage] = useState('');
  const [plateNumbers, setPlateNumbers] = useState([]);
  const [serviceCodes, setServiceCodes] = useState([]);

  useEffect(() => {
    // Fetch valid PlateNumbers from backend
    fetch('http://localhost:3001/cars')
      .then(res => res.json())
      .then(data => setPlateNumbers(data.map(car => car.PlateNumber)))
      .catch(() => setPlateNumbers([]));
    // Fetch valid ServiceCodes from backend
    fetch('http://localhost:3001/services')
      .then(res => res.json())
      .then(data => setServiceCodes(data.map(service => service.ServiceCode)))
      .catch(() => setServiceCodes([]));
  }, []);

  const handleChange = (e) => {
    setRecord({ ...record, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const response = await fetch('http://localhost:3001/servicerecords', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(record),
      });
      if (!response.ok) throw new Error('Failed to add service record');
      setMessage('Service record added successfully!');
      setRecord({ PlateNumber: '', ServiceCode: '', ServiceDate: '' });
      if (onRecordAdded) onRecordAdded();
    } catch (err) {
      setMessage('Failed to add service record');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 p-4 border rounded bg-light">
      <h3 className="mb-3">Add Service Record</h3>
      {message && (
        <div className={`alert ${message.includes('successfully') ? 'alert-success' : 'alert-danger'}`} role="alert">
          {message}
        </div>
      )}
      <div className="mb-3">
        <label className="form-label">Plate Number</label>
        <select
          className="form-control"
          name="PlateNumber"
          value={record.PlateNumber}
          onChange={handleChange}
          required
        >
          <option value="">Select Plate Number</option>
          {plateNumbers.map(pn => (
            <option key={pn} value={pn}>{pn}</option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label className="form-label">Service Code</label>
        <select
          className="form-control"
          name="ServiceCode"
          value={record.ServiceCode}
          onChange={handleChange}
          required
        >
          <option value="">Select Service Code</option>
          {serviceCodes.map(sc => (
            <option key={sc} value={sc}>{sc}</option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label className="form-label">Service Date</label>
        <input
          type="date"
          className="form-control"
          name="ServiceDate"
          value={record.ServiceDate}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">Add Service Record</button>
    </form>
  );
}

export default ServiceRecord;