const express = require('express');
const router = express.Router();

let leases = []; // In-memory (we’ll connect to DB later)

router.post('/', (req, res) => {
  const lease = req.body;
  lease.id = Date.now();
  leases.push(lease);
  res.status(201).json({ message: 'Lease created ✅', lease });
});

router.get('/:id', (req, res) => {
  const lease = leases.find(l => l.id == req.params.id);
  if (!lease) return res.status(404).json({ error: 'Lease not found' });
  res.json(lease);
});

module.exports = router;
