// server.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to database');
});

// Register Route
app.post('/register', async (req, res) => {
  const { email, password } = req.body;
  
  // Check if user exists
  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into database
    db.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword], (err, result) => {
      if (err) throw err;
      res.json({ msg: 'User registered successfully' });
    });
  });
});

// Login Route
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Check if user exists
  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, result) => {
    if (err) throw err;
    if (result.length === 0) {
      return res.status(400).json({ msg: 'User does not exist' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, result[0].password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Create token
    const token = jwt.sign({ id: result[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
