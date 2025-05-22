  
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const connectToDatabase = require('./src/index');
const db = connectToDatabase();

const app = express();
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // set to true if using HTTPS
}));

// Register route
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password], (err) => {
    if (err) return res.status(400).json({ error: 'Username already exists' });
    res.json({ message: 'Registered successfully' });
  });
});

// Login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  db.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, results) => {
    if (err || results.length === 0) return res.status(401).json({ error: 'Invalid credentials' });
    req.session.user = { id: results[0].id, username: results[0].username };
    res.json({ message: 'Login successful', user: req.session.user });
  });
});

// Example protected route
app.get('/profile', (req, res) => {
  if (!req.session.user) return res.status(401).json({ error: 'Not authenticated' });
  res.json({ user: req.session.user });
});

app.listen(3001, () => console.log('Server running on port 3001'));