const express = require('express');
const router = express.Router();
const rescueController = require('../controllers/rescueController');

router.get('/teams', rescueController.getTeams);
router.post('/assign', rescueController.assignRescue);
router.get('/history', rescueController.getHistory);

module.exports = router;
