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

// Example route
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from backend!' });
});

// Register route
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



app.get('/', (req, res) => {
    res.send('CRPMS backend is running!');
});

// Example route: get all services
app.get('/services', (req, res) => {
    db.query('SELECT * FROM Services', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});


app.post('/logout', (req, res) => {
  req.session.destroy(() => res.json({ message: 'Logged out' }));
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

// POST Car
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


// GET Cars
app.get('/cars', (req, res) => {
  db.query('SELECT * FROM Car', (err, result) => {
    if (err) return res.status(500).json({ error: 'Failed to fetch cars.' });
    res.json(result);
  });
});

// POST Service
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

// GET Services
app.get('/services', (req, res) => {
  db.query('SELECT * FROM Services', (err, result) => {
    if (err) return res.status(500).json({ error: 'Failed to fetch services.' });
    res.json(result);
  });
});

// POST Service Record
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

// GET Service Records
app.get('/servicerecords', (req, res) => {
  db.query('SELECT * FROM ServiceRecord', (err, result) => {
    if (err) return res.status(500).json({ error: 'Failed to fetch service records.' });
    res.json(result);
  });
});

// POST Payment
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

// GET Payments
app.get('/payments', (req, res) => {
  db.query('SELECT * FROM Payment', (err, result) => {
    if (err) return res.status(500).json({ error: 'Failed to fetch payments.' });
    res.json(result);
  });
});


// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
