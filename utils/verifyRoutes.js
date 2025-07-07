const fs = require('fs');
const path = require('path');

const REQUIRED_ROUTES = [
  'lease.js',
  'upload.js',
  'payment.js',
  'log.js'
];

const ROUTES_DIR = path.join(__dirname, '../routes');
const MISSING = [];

REQUIRED_ROUTES.forEach(file => {
  const fullPath = path.join(ROUTES_DIR, file);
  if (!fs.existsSync(fullPath)) {
    MISSING.push(file);
  }
});

module.exports = {
  isHealthy: MISSING.length === 0,
  missing: MISSING
};
