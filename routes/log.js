const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const logFile = path.join(__dirname, '../logs/test_results.json');

router.post('/test-results', (req, res) => {
  const entry = {
    timestamp: new Date().toISOString(),
    journey: req.body
  };

  let history = [];

  try {
    if (fs.existsSync(logFile)) {
      history = JSON.parse(fs.readFileSync(logFile));
    }
  } catch (e) {
    console.error('Error reading log file:', e);
  }

  history.push(entry);

  fs.writeFileSync(logFile, JSON.stringify(history, null, 2));
  res.status(200).json({ message: 'Test results logged ✅', entry });
});

module.exports = router;
