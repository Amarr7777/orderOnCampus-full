const express = require('express');
const router = express.Router();
const userController = require('./controllers/userController');
const canteenStaffController = require('./controllers/canteenStaffController');
const canteenController = require('./controllers/canteenController');

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

router.post('/registerCanteenStaff', canteenStaffController.registerCanteenStaff);
router.post('/loginStaff', canteenStaffController.loginCanteenStaff);

router.post('/registerCanteen', canteenController.registerCanteen);

module.exports = router;
