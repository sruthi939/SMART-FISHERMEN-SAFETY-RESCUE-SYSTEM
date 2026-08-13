const express = require('express');
const router = express.Router();
const rescueController = require('../controllers/rescueController');

router.get('/teams', rescueController.getTeams);
router.post('/assign', rescueController.assignRescue);
router.post('/accept', rescueController.acceptEmergency);
router.put('/:id/status', rescueController.updateRescueStatus);
router.get('/history', rescueController.getHistory);

module.exports = router;
