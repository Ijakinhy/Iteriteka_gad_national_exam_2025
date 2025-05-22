const express = require('express');
const cors = require('cors');
const session = require('express-session'); // <-- Add this line
const connectToDatabase = require('./src/index');
const servicesRouter = require('./routes/services');
const addCarsRouter = require('./routes/addcars');
const paymentsRouter = require('./routes/payments');
const serviceRecordRouter = require('./routes/ServiceRecord');
const carsRouter = require('./routes/cars');
const logoutRouter = require('./routes/logout');

const app = express();
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

app.use('/logout', logoutRouter);
app.use('/services', servicesRouter);
app.use('/cars', addCarsRouter);
app.use('/payments', paymentsRouter);
app.use('/servicerecords', serviceRecordRouter);
app.use('/cars', carsRouter);

const db = connectToDatabase();

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

// Register route
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'All fields are required.' });
  db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password], (err) => {
    if (err) return res.status(400).json({ error: 'Username already exists' });
    res.json({ message: 'Registered successfully' });
  });
});

app.post('/logout', (req, res) => {
  req.session.destroy(() => res.json({ message: 'Logged out' }));
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'All fields are required.' });

  const db = connectToDatabase();
  db.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (results.length === 0) return res.status(401).json({ error: 'Invalid credentials' });

    // Set session
    req.session.user = { id: results[0].id, username: results[0].username };
    res.json({ message: 'Login successful', user: req.session.user });
  });
});


const port = 3001;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});