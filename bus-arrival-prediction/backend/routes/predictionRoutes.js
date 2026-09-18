const express = require('express');
const router = express.Router();
const {
  predictArrival,
  getHistory,
  clearHistory
} = require('../controllers/predictionController');

// Route for predicting bus arrival time
router.post('/predict', predictArrival);

// Route for fetching prediction history
router.get('/history', getHistory);

// Route for clearing prediction history
router.delete('/history', clearHistory);

module.exports = router;
