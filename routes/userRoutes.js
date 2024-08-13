const express = require('express');
const {
  loginController,
  registerController,
} = require("../Controllers/userCtrl");

// routes on object
const router = express.Router();

// routes
// LOGIN || POST METHOD
router.post("/login", loginController);

// REGISTER || POST METHOD
router.post("/register", registerController);

module.exports = router;
