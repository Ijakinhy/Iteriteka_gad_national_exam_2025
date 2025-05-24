const express = require('express');
const cors = require('cors');
const session = require('express-session');
const mysql = require('mysql');
const connectToDatabase = require('./db');

const app = express();
const PORT = 4001;

// ✅ Middleware for parsing JSON
app.use(express.json());

// ✅ Correct CORS configuration
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true                 
}));

// ✅ Proper session setup
app.use(session({
  secret: 'jakin',       
  resave: false,
  saveUninitialized: false,  
  cookie: {
    httpOnly: true,      
    secure: false,        
    sameSite: 'lax'       
  }
}));

// MySQL connection
const db = connectToDatabase(); 

// Basic routes
app.get('/', (req, res) => {
    res.send('CRPMS backend is running!');
});

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from backend!' });
});


// Auth routes
app.post('/register', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  db.query(
    'INSERT INTO Users (username, password) VALUES (?, ?)',
    [username, password],
    (err, result) => {
      if (err) {
        return res.status(400).json({ error: 'Username already exists' });
      }
      res.json({ message: 'Registered successfully' });
    }
  );
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'All fields are required.' });

  const db = connectToDatabase();
  db.query('SELECT * FROM Users WHERE username = ? AND password = ?', [username, password], (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (results.length === 0) return res.status(401).json({ error: 'Invalid credentials' });

    // Set session
    req.session.user = { id: results[0].id, username: results[0].username };
    res.json({ message: 'Login successful', user: req.session.user });
  });
});

app.post('/logout', (req, res) => {
  req.session.destroy(() => res.json({ message: 'Logged out' }));
});

// Car routes
app.post('/cars', (req, res) => {
  const { Type, Model, ManufacturingYear, DriverPhone, MechanicName } = req.body;  
  if (!Type || !Model || !ManufacturingYear || !DriverPhone || !MechanicName) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const sql = `INSERT INTO Car (Type, Model, ManufacturingYear, DriverPhone, MechanicName)
               VALUES (?, ?, ?, ?, ?)`;
  db.query(sql, [Type, Model, ManufacturingYear, DriverPhone, MechanicName], (err) => {
    if (err) return res.status(500).json({ error: 'Failed to add car.' });
    res.status(201).json({ message: 'Car added successfully.' });
  });
});

app.get('/cars', (req, res) => {
  db.query('SELECT * FROM Car', (err, result) => {
    if (err) return res.status(500).json({ error: 'Failed to fetch cars.' });
    res.json(result);
  });
});

// Service routes
app.post('/services', (req, res) => {
  const { ServiceName, ServicePrice } = req.body;
  if (!ServiceName || !ServicePrice) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const sql = `INSERT INTO Services (ServiceName, ServicePrice)
               VALUES (?, ?)`;
  db.query(sql, [ServiceName, ServicePrice], (err) => {
    if (err) return res.status(500).json({ error: 'Failed to add service.' });
    res.status(201).json({ message: 'Service added successfully.' });
  });
});

app.get('/services', (req, res) => {
  db.query('SELECT * FROM Services', (err, result) => {
    if (err) return res.status(500).json({ error: 'Failed to fetch services.' });
    res.json(result);
  });
});

// Service Record routes
app.post('/servicerecords', (req, res) => {
  const { PlateNumber, ServiceCode, ServiceDate } = req.body;
  if (!PlateNumber || !ServiceCode || !ServiceDate) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const sql = `INSERT INTO ServiceRecord (PlateNumber, ServiceCode, ServiceDate)
               VALUES (?, ?, ?)`;
  db.query(sql, [PlateNumber, ServiceCode, ServiceDate], (err) => {
    if (err) return res.status(500).json({ error: 'Failed to add service record.' });
    res.status(201).json({ message: 'Service record added successfully.' });
  });
});

app.get('/servicerecords', (req, res) => {
  db.query('SELECT * FROM ServiceRecord', (err, result) => {
    if (err) return res.status(500).json({ error: 'Failed to fetch service records.' });
    res.json(result);
  });
});

// Payment routes
app.post('/payments', (req, res) => {
  const { RecordNumber, AmountPaid, PaymentDate } = req.body;
  if (!RecordNumber || !AmountPaid || !PaymentDate) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const sql = `INSERT INTO Payment (RecordNumber, AmountPaid, PaymentDate)
               VALUES (?, ?, ?)`;
  db.query(sql, [RecordNumber, AmountPaid, PaymentDate], (err) => {
    if (err) return res.status(500).json({ error: 'Failed to add payment.' });
    res.status(201).json({ message: 'Payment added successfully.' });
  });
});

app.get('/payments', (req, res) => {
  db.query('SELECT * FROM Payment', (err, result) => {
    if (err) return res.status(500).json({ error: 'Failed to fetch payments.' });
    res.json(result);
  });
});

// UPDATE a payment
app.put('/payments/:id', (req, res) => {

  
  const { id } = req.params;
  const { RecordNumber, AmountPaid, PaymentDate } = req.body;

  if (!RecordNumber || !AmountPaid || !PaymentDate) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const sql = `UPDATE Payment SET RecordNumber = ?, AmountPaid = ?, PaymentDate = ? WHERE PaymentNumber = ?`;
  db.query(sql, [RecordNumber, AmountPaid, PaymentDate, id], (err, result) => {
    if (err) {
      console.error('Error updating payment:', err);
      return res.status(500).json({ error: 'Failed to update payment' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Payment not found' });
    }
    res.json({ message: 'Payment updated successfully' });
  });
});

// DELETE a payment
app.delete('/payments/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM Payment WHERE PaymentNumber = ?', [id], (err, result) => {
    if (err) {
      console.error('Error deleting payment:', err);
      return res.status(500).json({ error: 'Failed to delete payment' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Payment not found' });
    }
    res.json({ message: 'Payment deleted successfully' });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});