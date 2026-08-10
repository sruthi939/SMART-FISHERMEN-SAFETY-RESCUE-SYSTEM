const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weatherController');

router.get('/', weatherController.getWeatherForecast);
router.post('/advisory', weatherController.updateWeatherAdvisory);

module.exports = router;
