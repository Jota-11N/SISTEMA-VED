const express = require('express');
const router = express.Router();
const votingController = require('../controllers/votingController');

router.post('/process', votingController.processVote);

module.exports = router;
