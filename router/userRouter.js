const express = require('express');
const router = express.Router();
const userController = require('../controller/user/userController');
const passportConfig = require('../config/passport');
const passport = passportConfig.passport;

router.get('/', userController.loadHomepage);
router.get('/signup', userController.loadSignup);
router.post('/signup', userController.signup);
router.get('/signin',userController.loadLogin);
router.post('/signin',userController.signin);
router.get('/verify-otp', userController.loadVerifyOtp);
router.post('/verify-otp', userController.verifyOtp);
router.get('/resend-otp', userController.resendOtp);
router.get('/pagenotfound', userController.pageNotfound);



router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}))

router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/signup' }), (req, res) => {
    res.redirect('/');
});

module.exports = router;