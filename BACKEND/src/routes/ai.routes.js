const express = require('express');
const router = express.Router();
const { aiResponse } = require('../controllers/ai.respose');

router.post("/get-response", aiResponse)

module.exports = router;