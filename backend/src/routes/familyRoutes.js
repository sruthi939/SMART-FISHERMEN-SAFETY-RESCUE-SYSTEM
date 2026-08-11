const express = require('express');
const router = express.Router();
const familyController = require('../controllers/familyController');

router.get('/messages/:boatId', familyController.getMessages);
router.post('/messages', familyController.sendMessage);
router.get('/market-prices', familyController.getMarketPrices);

module.exports = router;
