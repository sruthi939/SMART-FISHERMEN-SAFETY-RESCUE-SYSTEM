const express = require('express');
const router = express.Router();
const familyController = require('../controllers/familyController');

router.get('/', familyController.getAll);
router.get('/my-fisherman', familyController.getMyFisherman);
router.get('/:id', familyController.getById);

module.exports = router;
