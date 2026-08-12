const express = require('express');
const router = express.Router();
const locationController = require('../controllers/locationController');

router.get('/live', locationController.getLiveLocations);
router.post('/update', locationController.updateLocation);

module.exports = router;
