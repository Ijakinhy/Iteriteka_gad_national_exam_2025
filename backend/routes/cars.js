const express = require('express');
const router = express.Router();
const connectToDatabase = require('../src/index');
const db = connectToDatabase();

router.get('/', (req, res) => {
  db.query('SELECT PlateNumber FROM Car', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

module.exports = router;