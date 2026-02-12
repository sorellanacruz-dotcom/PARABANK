const express = require('express');
const bcrypt = require('bcryptjs');
const { signToken } = require('../auth');

const router = express.Router();

// In-memory user store (replace with DB in production)
const users = [];

router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
  const existing = users.find(u => u.email === email);
  if (existing) return res.status(400).json({ error: 'User exists' });
  const hashed = await bcrypt.hash(password, 10);
  const user = { id: users.length + 1, email, password: hashed };
  users.push(user);
  const token = signToken({ id: user.id, email: user.email });
  res.json({ token });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  if (!user) return res.status(400).json({ error: 'Invalid credentials' });
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(400).json({ error: 'Invalid credentials' });
  const token = signToken({ id: user.id, email: user.email });
  res.json({ token });
});

module.exports = router;
