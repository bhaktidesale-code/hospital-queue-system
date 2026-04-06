const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');

router.post('/register', patientController.registerPatient);
router.get('/queue', patientController.getQueue);
router.post('/serve', patientController.servePatient);
router.get('/history', patientController.getHistory);
router.get('/dashboard', patientController.getDashboardStats);
router.get('/departments', patientController.getDepartments);

module.exports = router;