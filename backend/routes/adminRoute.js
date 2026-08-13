const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authController = require('../controllers/authController');

router.get('/stats', adminController.getDashboardStats);
router.get('/pending-users', authController.getPendingUsers);
router.get('/users', authController.getAllUsers);
router.put('/approve-user/:id', authController.approveUser);
router.put('/reject-user/:id', authController.rejectUser);

module.exports = router;
