const express = require('express');
const router = express.Router();
const trackingController = require('../controllers/trackingController');

router.post('/telemetry', trackingController.postTelemetry);
router.get('/boats', trackingController.getBoatLocations);

module.exports = router;
