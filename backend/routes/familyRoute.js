const express = require('express');
const router = express.Router();
const familyController = require('../controllers/familyController');

router.get('/', familyController.getLinkedFishermen);
router.get('/fishermen', familyController.getLinkedFishermen);
router.get('/fisherman/:id', familyController.getFishermanDetails);
router.post('/link-fisherman', familyController.linkFisherman);

module.exports = router;
