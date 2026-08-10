const express = require('express');
const router = express.Router();
const rescueController = require('../controllers/rescueController');

router.get('/units', rescueController.getRescueUnits);
router.post('/dispatch', rescueController.dispatchUnit);
router.patch('/units/:id/position', rescueController.updateUnitPosition);

module.exports = router;
