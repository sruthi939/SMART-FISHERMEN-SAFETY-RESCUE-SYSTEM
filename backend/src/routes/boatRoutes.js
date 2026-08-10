const express = require('express');
const router = express.Router();
const boatController = require('../controllers/boatController');

router.get('/', boatController.getAllBoats);
router.get('/:id', boatController.getBoatById);
router.patch('/:id/status', boatController.updateBoatStatus);

module.exports = router;
