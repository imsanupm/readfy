const express = require('express');
const router = express.Router();
const userController = require('../controller/user/userController');

router.get('/', userController.loadHomepage);
router.get('/signup', userController.loadSignup);
router.post('/signup', userController.signup);
router.get('/verify-otp', userController.loadVerifyOtp);
router.post('/verify-otp', userController.verifyOtp);
router.get('/resend-otp', userController.resendOtp);
router.get('/pagenotfound', userController.pageNotfound);


module.exports = router;