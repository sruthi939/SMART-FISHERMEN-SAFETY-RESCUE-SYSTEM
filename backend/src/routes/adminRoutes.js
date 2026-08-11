const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/dashboard', adminController.getAdminDashboard);
router.get('/coastal-districts', adminController.getCoastalDistricts);
router.get('/pending-users', adminController.getPendingUsers);
router.patch('/verify-user/:userId', adminController.verifyUser);
router.post('/register-boat', adminController.registerBoat);

module.exports = router;
