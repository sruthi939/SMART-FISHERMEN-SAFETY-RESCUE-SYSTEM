const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

router.get('/', reportController.getReports);
router.get('/rescue', reportController.getRescueReports);
router.get('/accident', reportController.getAccidentReports);
router.post('/generate', reportController.generateReport);

module.exports = router;
