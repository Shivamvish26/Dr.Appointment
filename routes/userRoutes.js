const express = require('express');
const {
  loginController,
  registerController,
  authController,
  applyDoctorController
} = require("../Controllers/userCtrl");
const authMiddleware = require('../middleware/authMiddleware');

// routes on object
const router = express.Router();

// routes
// LOGIN || POST METHOD
router.post("/login", loginController);

// REGISTER || POST METHOD
router.post("/register", registerController);

// Auth || POST METHOD
router.post("/getuserData",authMiddleware, authController)

// ApplyDoctor || POST METHOD
router.post("/apply-doctor",authMiddleware, applyDoctorController)

module.exports = router;
