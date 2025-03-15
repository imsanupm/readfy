const express = require('express');
const adminRouter = express.Router();
const adminController = require('../controller/admin/adminSignup')
const adminDashBoard = require('../controller/admin/dashboard')



adminRouter.get('/adminlogin', adminController.loadLogin);

adminRouter.post('/adminlogin',adminController.verifyAdmin);
adminRouter.get('/dashboard',adminDashBoard.loadDashBoard);


module.exports= adminRouter;

