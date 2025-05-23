import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const response = await fetch('http://localhost:4001/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage('Registration successful! Redirecting...');
        setForm({ username: '', password: '' });
        setTimeout(() => navigate('/dashboard'), 1000); // Redirect after 1s
      } else {
        setMessage(data.error || 'Registration failed');
      }
    } catch {
      setMessage('Registration failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded bg-light mt-5" style={{ maxWidth: 400, margin: 'auto' }}>
      <h3 className="mb-3">Register</h3>
      {message && (
        <div className={`alert ${message.includes('successful') ? 'alert-success' : 'alert-danger'}`} role="alert">
          {message}
        </div>
      )}
      <div className="mb-3">
        <label className="form-label">Username</label>
        <input
          type="text"
          className="form-control"
          name="username"
          value={form.username}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Password</label>
        <input
          type="password"
          className="form-control"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="btn btn-success w-100 mb-2">Register</button>
      <Link to="/login" className="btn btn-primary w-100">Login</Link>
    </form>
  );
}

export default Register;