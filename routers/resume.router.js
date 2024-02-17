const express = require('express');
const jwtValidate = require('../middleware/jwt-validate.middleware');
const resumeController = require('../src/controller/resume.controller');
const router = express.Router();

router.get('/', resumeController.findAllResumes)

router.get('/:resumeId', resumeController.findOneResume)

router.post('/', jwtValidate, resumeController.createResume)

router.patch('/:resumeId', jwtValidate, resumeController.updateResume)

router.delete('/:resumeId', jwtValidate, resumeController.deleteResume)

module.exports = router;