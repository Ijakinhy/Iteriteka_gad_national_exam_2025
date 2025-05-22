import React, { useEffect, useState } from 'react';

function OptPayments() {
  const [payments, setPayments] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editPayment, setEditPayment] = useState({
    RecordNumber: '',
    AmountPaid: '',
    PaymentDate: ''
  });
  const [message, setMessage] = useState('');

  // Fetch all payments
  const fetchPayments = () => {
    fetch('http://localhost:3001/payments')
      .then(res => res.json())
      .then(data => setPayments(data))
      .catch(() => setPayments([]));
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  // Handle delete
  const handleDelete = (id) => {
    if (!window.confirm('Are you sure you want to delete this payment?')) return;
    fetch(`http://localhost:3001/payments/${id}`, { method: 'DELETE' })
      .then(res => res.json())
      .then(() => {
        setMessage('Payment deleted successfully.');
        fetchPayments();
      })
      .catch(() => setMessage('Failed to delete payment.'));
  };

  // Handle edit
  const handleEdit = (payment) => {
    setEditId(payment.PaymentNumber);
    setEditPayment({
      RecordNumber: payment.RecordNumber,
      AmountPaid: payment.AmountPaid,
      PaymentDate: payment.PaymentDate ? payment.PaymentDate.slice(0, 10) : ''
    });
    setMessage('');
  };

  // Handle update submit
  const handleUpdate = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3001/payments/${editId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editPayment),
    })
      .then(res => res.json())
      .then(() => {
        setMessage('Payment updated successfully.');
        setEditId(null);
        fetchPayments();
      })
      .catch(() => setMessage('Failed to update payment.'));
  };

  // Handle edit input change
  const handleEditChange = (e) => {
    setEditPayment({ ...editPayment, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mt-4">
      <h2>Payments</h2>
      {message && (
        <div className={`alert ${message.includes('successfully') ? 'alert-success' : 'alert-danger'}`} role="alert">
          {message}
        </div>
      )}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Payment Number</th>
            <th>Record Number</th>
            <th>Amount Paid</th>
            <th>Payment Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {payments.map(payment =>
            editId === payment.PaymentNumber ? (
              <tr key={payment.PaymentNumber}>
                <td>{payment.PaymentNumber}</td>
                <td>
                  <input
                    type="number"
                    name="RecordNumber"
                    value={editPayment.RecordNumber}
                    onChange={handleEditChange}
                    className="form-control"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    step="0.01"
                    name="AmountPaid"
                    value={editPayment.AmountPaid}
                    onChange={handleEditChange}
                    className="form-control"
                  />
                </td>
                <td>
                  <input
                    type="date"
                    name="PaymentDate"
                    value={editPayment.PaymentDate}
                    onChange={handleEditChange}
                    className="form-control"
                  />
                </td>
                <td>
                  <button className="btn btn-success btn-sm me-2" onClick={handleUpdate}>Save</button>
                  <button className="btn btn-secondary btn-sm" onClick={() => setEditId(null)}>Cancel</button>
                </td>
              </tr>
            ) : (
              <tr key={payment.PaymentNumber}>
                <td>{payment.PaymentNumber}</td>
                <td>{payment.RecordNumber}</td>
                <td>{payment.AmountPaid}</td>
                <td>{payment.PaymentDate ? payment.PaymentDate.slice(0, 10) : ''}</td>
                <td>
                  <button className="btn btn-primary btn-sm me-2" onClick={() => handleEdit(payment)}>Edit</button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(payment.PaymentNumber)}>Delete</button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}

export default OptPayments;