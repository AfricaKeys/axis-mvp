// Core modules
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

// Middleware
const jwtAuth = require('./middleware/jwtAuth');
const upload = require('./middleware/upload');

// Init Express
const app = express();
app.use(cors());
app.use(express.json());

// ✅ Log Stream (optional, remove if not needed)
const logStream = fs.createWriteStream('./logs/backend.log', { flags: 'a' });
app.use((req, res, next) => {
  logStream.write(`[${new Date().toISOString()}] ${req.method} ${req.url}\n`);
  next();
});

// ✅ Static folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
const leaseRoutes = require('./routes/lease');
app.use('/lease', leaseRoutes);

const uploadRoutes = require('./routes/upload');
app.use('/upload', uploadRoutes);

const paymentRoutes = require('./routes/payment');
app.use('/payment', paymentRoutes);

const logRoutes = require('./routes/log');
app.use('/log', logRoutes);

// ✅ Test protected upload route
app.post('/api/submit-lease', jwtAuth, upload.single('document'), (req, res) => {
  const { name, unit } = req.body;
  const doc = req.file;

  if (!doc) {
    return res.status(400).json({ error: 'No document uploaded' });
  }

  res.json({
    message: 'Lease submitted successfully',
    file: doc.filename,
    path: doc.path
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
