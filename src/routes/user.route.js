const express = require('express');
const router = express.Router();
const { login, signup, otp, resetPassword, verifyEmail } = require('../controllers/user.controller.js');

// Auth routes
router.post('/signup', signup);
router.post('/login', login);
router.post('/verifyEmail', verifyEmail);
router.post('/otp', otp);
router.post('/resetPassword', resetPassword);

module.exports = router;