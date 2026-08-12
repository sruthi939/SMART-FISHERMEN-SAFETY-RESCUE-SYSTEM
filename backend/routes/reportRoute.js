const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

router.get('/', reportController.getReports);
router.post('/generate', reportController.generateReport);

module.exports = router;
