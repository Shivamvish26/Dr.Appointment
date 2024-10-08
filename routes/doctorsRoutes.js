const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  getDoctorInfoController,
  updateProfileController,
  getDoctorbyidController,
  doctorAppointmentsController,
  updateStatusController
} = require("../Controllers/doctorsCtrl");
const router = express.Router();

// Post SINGLE INFO
router.post("/getDoctorInfo", authMiddleware, getDoctorInfoController);

// Post Update Profile
router.post("/updateprofile", authMiddleware, updateProfileController);

// POST GET SINGLE DOC
router.post("/getDoctorByID", authMiddleware, getDoctorbyidController);

// Get Appoinments
router.get("/doctor-appoinment", authMiddleware, doctorAppointmentsController);

// Post Update Status
router.post("/updatestatus", authMiddleware, updateStatusController);

module.exports = router;
