const express = require('express');
const router = express.Router();
const connectToDatabase = require('../src/index');
const db = connectToDatabase();

// Create payment (already exists)
router.post('/', (req, res) => {
  const { RecordNumber, AmountPaid, PaymentDate } = req.body;
  if (!RecordNumber || !AmountPaid || !PaymentDate) {
    return res.status(400).json({ error: 'All fields are required.' });
  }
  const sql = `
    INSERT INTO Payment (RecordNumber, AmountPaid, PaymentDate)
    VALUES (?, ?, ?)
  `;
  db.query(sql, [RecordNumber, AmountPaid, PaymentDate], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: 'Payment added successfully.' });
  });
});

// Get all payments
router.get('/', (req, res) => {
  db.query('SELECT * FROM Payment', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Update a payment
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { RecordNumber, AmountPaid, PaymentDate } = req.body;
  if (!RecordNumber || !AmountPaid || !PaymentDate) {
    return res.status(400).json({ error: 'All fields are required.' });
  }
  const sql = `
    UPDATE Payment
    SET RecordNumber = ?, AmountPaid = ?, PaymentDate = ?
    WHERE PaymentNumber = ?
  `;
  db.query(sql, [RecordNumber, AmountPaid, PaymentDate, id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Payment updated successfully.' });
  });
});

// Delete a payment
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM Payment WHERE PaymentNumber = ?', [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Payment deleted successfully.' });
  });
});

module.exports = router;