const express = require('express');
const router = express.Router();
const fishermanController = require('../controllers/fishermanController');

router.get('/', fishermanController.getFishermen);
router.get('/:id', fishermanController.getFishermanById);

module.exports = router;
