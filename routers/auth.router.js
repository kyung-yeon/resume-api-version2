import express from 'express';
import authController from '../src/controller/auth.controller.js';
const router = express.Router();

router.post('/token', authController.generateNewAccessTokenByFreshToken)

export default router;

