const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config();

const jwtAuth = require('./middleware/jwtAuth');
const { isHealthy, missing } = require('./utils/verifyRoutes');

// Block startup if routes missing
if (!isHealthy) {
  console.error("🚨 Missing route files:", missing);
  process.exit(1);
}

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Upload setup
const multer = require('multer');
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const suffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `${suffix}-${file.originalname}`);
  }
});
const upload = multer({ storage });

// Logging setup
const morgan = require('morgan');
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'logs/access.log'), { flags: 'a' });
app.use(morgan('combined', { stream: accessLogStream }));

// Routes
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const leaseRoutes = require('./routes/lease');
const uploadRoutes = require('./routes/upload');
const paymentRoutes = require('./routes/payment');
const logRoutes = require('./routes/log');

app.use('/lease', leaseRoutes);
app.use('/upload', uploadRoutes);
app.use('/payment', paymentRoutes);
app.use('/log', logRoutes);

// Submit lease w/ upload
app.post('/api/submit-lease', jwtAuth, upload.single('document'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No document uploaded' });
  }
  res.status(200).json({
    message: 'Lease submitted',
    filename: req.file.filename,
    fields: req.body
  });
});

// Health check
app.get('/', (req, res) => res.send('✅ Backend is running'));

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
