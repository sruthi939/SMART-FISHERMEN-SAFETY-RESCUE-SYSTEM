const express = require('express');
const router = express.Router();
const fishermanController = require('../controllers/fishermanController');

router.get('/', fishermanController.getAll);
router.get('/:id', fishermanController.getById);
router.put('/:id', fishermanController.updateProfile);

module.exports = router;
