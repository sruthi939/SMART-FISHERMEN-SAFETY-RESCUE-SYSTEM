const express = require('express');
const router = express.Router();
const boatController = require('../controllers/boatController');

router.get('/', boatController.getAll);
router.get('/:id', boatController.getById);
router.post('/', boatController.registerBoat);

module.exports = router;
