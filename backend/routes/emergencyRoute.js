const express = require('express');
const router = express.Router();
const emergencyController = require('../controllers/emergencyController');

router.post('/sos', emergencyController.triggerSOS);
router.get('/active', emergencyController.getActiveEmergencies);
router.put('/:id/resolve', emergencyController.resolveEmergency);

module.exports = router;
