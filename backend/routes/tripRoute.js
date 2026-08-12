const express = require('express');
const router = express.Router();
const tripController = require('../controllers/tripController');

router.get('/', tripController.getTrips);
router.get('/active', tripController.getActiveTrip);
router.post('/start', tripController.startTrip);
router.post('/:id/end', tripController.endTrip);

module.exports = router;
