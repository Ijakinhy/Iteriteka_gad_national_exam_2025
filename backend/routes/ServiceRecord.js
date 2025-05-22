const express = require('express');
const router = express.Router();
const connectToDatabase = require('../src/index');

const db = connectToDatabase();

// POST /servicerecords - Add a new service record
router.post('/', (req, res) => {
  const { PlateNumber, ServiceCode, ServiceDate } = req.body;
  if (!PlateNumber || !ServiceCode || !ServiceDate) {
    return res.status(400).json({ error: 'All fields are required.' });
  }
  const sql = `
    INSERT INTO ServiceRecord (PlateNumber, ServiceCode, ServiceDate)
    VALUES (?, ?, ?)
  `;
  db.query(sql, [PlateNumber, ServiceCode, ServiceDate], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: 'Service record added successfully.' });
  });
});

// GET /servicerecords - List all service records
router.get('/', (req, res) => {
  db.query('SELECT RecordNumber, PlateNumber, ServiceCode, ServiceDate FROM ServiceRecord', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

module.exports = router;