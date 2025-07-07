const express = require('express');
const router = express.Router();

let payments = [];

router.post('/', (req, res) => {
  const { tenant, amount, type } = req.body;
  const payment = {
    id: Date.now(),
    tenant,
    amount,
    type: type || 'rent',
    status: 'paid',
    timestamp: new Date().toISOString()
  };
  payments.push(payment);
  res.status(201).json({ message: 'Payment recorded ✅', payment });
});

router.get('/:id', (req, res) => {
  const payment = payments.find(p => p.id == req.params.id);
  if (!payment) return res.status(404).json({ error: 'Payment not found' });
  res.json(payment);
});

module.exports = router;
