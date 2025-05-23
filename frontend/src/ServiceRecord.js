import React, { useState, useEffect } from 'react';

function ServiceRecord() {
  const [record, setRecord] = useState({
    PlateNumber: '',
    ServiceCode: '',
    ServiceDate: ''
  });
  const [message, setMessage] = useState('');
  const [cars, setCars] = useState([]);
  const [services, setServices] = useState([]);

  const fetchCarsAndServices = async () => {
    try {
      const carsResponse = await fetch('http://localhost:4001/cars');
      const servicesResponse = await fetch('http://localhost:4001/services');
      const carsData = await carsResponse.json();
      const servicesData = await servicesResponse.json();
      console.log(carsData);
      if(carsResponse.ok && servicesResponse.ok) {
        setCars(carsData);
        setServices(servicesData)
      }
      if(servicesResponse.ok) {
        const servicesData = await servicesResponse.json();
        setServices(servicesData.map(service => service.ServiceCode));
      }
    }
  catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchCarsAndServices();
    
  }, []);

  const handleChange = (e) => {
    setRecord({ ...record, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const response = await fetch('http://localhost:4001/servicerecords', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(record),
      });
      if (!response.ok) throw new Error('Failed to add service record');
      setMessage('Service record added successfully!');
      setRecord({ PlateNumber: '', ServiceCode: '', ServiceDate: '' });

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
          {cars.map((car,index) => (
            <option key={index} value={car.PlateNumber}>{`${car.PlateNumber}-${car.Type}`}</option>
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
          {services.map((service,index) => (
            <option key={index} value={service.ServiceCode}>{`${service.ServiceCode}-${service.ServiceName}`}</option>
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