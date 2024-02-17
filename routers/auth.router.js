const express = require('express');
const authController = require('../src/controller/auth.controller');
const router = express.Router();

router.post('/token', authController.generateNewAccessTokenByFreshToken)

module.exports = router;

