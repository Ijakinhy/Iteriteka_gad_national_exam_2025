const express = require('express');
const router = express.Router();
const connectToDatabase = require('../src/index');

const db = connectToDatabase();

// POST /services route
router.post('/', (req, res) => {
  const { ServiceCode, ServiceName, ServicePrice } = req.body;
  if (!ServiceCode || !ServiceName || ServicePrice == null) {
    return res.status(400).json({ error: 'All fields are required.' });
  }
  const sql = 'INSERT INTO Services (ServiceCode, ServiceName, ServicePrice) VALUES (?, ?, ?)';
  db.query(sql, [ServiceCode, ServiceName, ServicePrice], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: 'Service added successfully.' });
  });
});

// GET /services route (optional, for listing)
router.get('/', (req, res) => {
  db.query('SELECT * FROM Services', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

module.exports = router;