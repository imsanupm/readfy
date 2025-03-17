const express = require('express');
const adminRouter = express.Router();
const adminController = require('../controller/admin/adminSignup')
const adminDashBoard = require('../controller/admin/dashboard')
const adminUserList = require('../controller/admin/userList');
const adminCategory = require('../controller/admin/category')



adminRouter.get('/adminlogin', adminController.loadLogin);

adminRouter.post('/adminlogin',adminController.verifyAdmin);
adminRouter.get('/dashboard',adminDashBoard.loadDashBoard);
adminRouter.get('/userList',adminUserList.loadUserList);
adminRouter.post('userList',adminUserList.searchUser);
adminRouter.get('/category',adminCategory.categoryInfo);
adminRouter.post('/addCategory',adminCategory.addCategory);



module.exports= adminRouter;

