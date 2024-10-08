const express = require("express");
const {
  loginController,
  registerController,
  authController,
  applyDoctorController,
  getallnotificationController,
  deleteallnotificationController,
  getallDoctorlistController,
  bookeAppointmentController,
  bookingAvailabilityController,
  userAppointmentsController
} = require("../Controllers/userCtrl");
const authMiddleware = require("../middleware/authMiddleware");

// routes on object
const router = express.Router();

// routes

// LOGIN || POST METHOD
router.post("/login", loginController);

// REGISTER || POST METHOD
router.post("/register", registerController);

// AUTH || POST METHOD
router.post("/getuserData", authMiddleware, authController);

// APPLY DOCTOR || POST METHOD
router.post("/apply-doctor", authMiddleware, applyDoctorController);

// NOTIFICATION COCTOR || POST METHOD
router.post(
  "/get-all-notification",
  authMiddleware,
  getallnotificationController
);

// DELETE ALL NOTIFICATION || POST METHOD
router.post(
  "/delete-all-notification",
  authMiddleware,
  deleteallnotificationController
);

// GET ALL DOC || GET METHOD
router.get("/getAllDoctorslist", authMiddleware, getallDoctorlistController);

// BOOK AN APPOINMENT | POST METHOD
router.post("/book-appointment",authMiddleware, bookeAppointmentController)

// Booking Avliability
router.post("/book-availibility",authMiddleware, bookingAvailabilityController)

// Appoinment list
router.get("/user-appoinment",authMiddleware, userAppointmentsController)

module.exports = router;
