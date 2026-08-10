const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/dashboard', adminController.getAdminDashboard);
router.post('/register-boat', adminController.registerBoat);

module.exports = router;
