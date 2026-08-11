const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.post('/login', authController.login);
router.get('/users', authController.getUsers);
router.get('/profile', authenticateToken, authController.getProfile);

module.exports = router;
