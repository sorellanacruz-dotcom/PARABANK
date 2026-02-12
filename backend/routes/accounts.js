const express = require('express');
const { verifyToken } = require('../auth');

const router = express.Router();

// Sample in-memory accounts per user
const sampleAccounts = {
  1: [
    { id: 'acc-1', type: 'checking', balance: 1200.5 },
    { id: 'acc-2', type: 'savings', balance: 5400.0 }
  ]
};

router.get('/', verifyToken, (req, res) => {
  const userId = req.user.id;
  const accounts = sampleAccounts[userId] || [];
  res.json({ accounts });
});

router.post('/transactions', verifyToken, (req, res) => {
  const { accountId, amount, description } = req.body;
  if (!accountId || typeof amount !== 'number') return res.status(400).json({ error: 'accountId and numeric amount required' });
  // For scaffold, just echo back
  res.json({ status: 'ok', accountId, amount, description });
});

module.exports = router;
