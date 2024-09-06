const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  getAllDoctorsController,
  getAllUsersController,
  updateAccountStatusController
} = require("../Controllers/adminCtrl");

const router = express.Router();

// GET METHOD || USERS
router.get("/getAllUsers", authMiddleware, getAllUsersController);

// GET METHOD || DOCTORS
router.get("/getAllDoctors", authMiddleware, getAllDoctorsController);

// POST ACCOUNT STATUS
router.post("/updateAccountStatus", authMiddleware, updateAccountStatusController);

module.exports = router;
