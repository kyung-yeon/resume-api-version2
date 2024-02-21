import express from 'express';
import jwtValidate from '../middleware/jwt-validate.middleware.js';
import resumeController from '../src/controller/resume.controller.js';
const router = express.Router();

router.get('/', resumeController.findAllResumes)

router.get('/:resumeId', resumeController.findOneResume)

router.post('/', jwtValidate, resumeController.createResume)

router.patch('/:resumeId', jwtValidate, resumeController.updateResume)

router.delete('/:resumeId', jwtValidate, resumeController.deleteResume)

export default router;