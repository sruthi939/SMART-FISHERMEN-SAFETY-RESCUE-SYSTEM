const express = require('express');
const router = express.Router();
const emergencyController = require('../controllers/emergencyController');

router.get('/', emergencyController.getEmergencies);
router.post('/sos', emergencyController.triggerBoatSOS);
router.post('/mob', emergencyController.triggerMOBWearable);
router.patch('/:id/resolve', emergencyController.resolveEmergency);

module.exports = router;
