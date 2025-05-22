const express = require('express');
const router = express.Router();
const connectToDatabase = require('../src/index');

const db = connectToDatabase();

router.post('/', (req, res) => {
  const { PlateNumber, Type, Model, ManufacturingYear, DriverPhone, MechanicName } = req.body;
  if (!PlateNumber || !Type || !Model || !ManufacturingYear || !DriverPhone || !MechanicName) {
    return res.status(400).json({ error: 'All fields are required.' });
  }
  const sql = `
    INSERT INTO Car (PlateNumber, Type, Model, ManufacturingYear, DriverPhone, MechanicName)
    VALUES (?, ?, ?, ?, ?, ?)
  `;


  db.query(
    sql,
    [PlateNumber, Type, Model, ManufacturingYear, DriverPhone, MechanicName],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ message: 'Car added successfully.' });
    }
  );
});
// GET /cars - List all cars


module.exports = router;