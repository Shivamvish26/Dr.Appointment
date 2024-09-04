const express = require('express');
const {
  loginController,
  registerController,
  authController,
  applyDoctorController,
  getallnotificationController,
  deleteallnotificationController
} = require("../Controllers/userCtrl");
const authMiddleware = require('../middleware/authMiddleware');

// routes on object
const router = express.Router();

// routes
// LOGIN || POST METHOD
router.post("/login", loginController);

// REGISTER || POST METHOD
router.post("/register", registerController);

// AUTH || POST METHOD
router.post("/getuserData",authMiddleware, authController)

// APPLY DOCTOR || POST METHOD
router.post("/apply-doctor",authMiddleware, applyDoctorController)

// NOTIFICATION COCTOR || POST METHOD
router.post("/get-all-notification",authMiddleware, getallnotificationController)

// DELETE ALL NOTIFICATION || POST METHOD
router.post("/delete-all-notification",authMiddleware, deleteallnotificationController)


module.exports = router;
