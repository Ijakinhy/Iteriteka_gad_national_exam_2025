import React, { useState, useEffect } from 'react';

function Payement({ onPaymentAdded }) {
  const [payment, setPayment] = useState({
    RecordNumber: '',
    AmountPaid: '',
    PaymentDate: ''
  });
  const [message, setMessage] = useState('');
  const [recordNumbers, setRecordNumbers] = useState([]);

  useEffect(() => {
    // Fetch valid RecordNumbers from backend
    fetch('http://localhost:3001/servicerecords')
      .then(res => res.json())
      .then(data => setRecordNumbers(data))
      .catch(() => setRecordNumbers([]));
  }, []);

  const handleChange = (e) => {
    setPayment({ ...payment, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const response = await fetch('http://localhost:3001/payments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payment),
      });
      if (!response.ok) throw new Error('Failed to add payment');
      setMessage('Payment added successfully!');
      setPayment({ RecordNumber: '', AmountPaid: '', PaymentDate: '' });
      if (onPaymentAdded) onPaymentAdded();
    } catch (err) {
      setMessage('Failed to add payment');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 p-4 border rounded bg-light">
      <h3 className="mb-3">Add Payment</h3>
      {message && (
        <div className={`alert ${message.includes('successfully') ? 'alert-success' : 'alert-danger'}`} role="alert">
          {message}
        </div>
      )}
      <div className="mb-3">
        <label className="form-label">Record Number</label>
        <select
          className="form-control"
          name="RecordNumber"
          value={payment.RecordNumber}
          onChange={handleChange}
          required
        >
          <option value="">Select Record Number</option>
          {recordNumbers.map(rn => (
            <option key={rn.RecordNumber} value={rn.RecordNumber}>
              {rn.RecordNumber}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label className="form-label">Amount Paid</label>
        <input
          type="number"
          step="0.01"
          className="form-control"
          name="AmountPaid"
          value={payment.AmountPaid}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Payment Date</label>
        <input
          type="date"
          className="form-control"
          name="PaymentDate"
          value={payment.PaymentDate}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">Add Payment</button>
    </form>
  );
}

export default Payement;