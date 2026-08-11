const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/dashboard', adminController.getAdminDashboard);
router.get('/coastal-districts', adminController.getCoastalDistricts);
router.post('/register-boat', adminController.registerBoat);

module.exports = router;
