const express = require('express')
const authMiddleware = require('../middleware/authMiddleware')
const { getDoctorInfoController,updateProfileController } = require('../Controllers/doctorsCtrl')
const router = express.Router()

// Post SINGLE INFO
router.post('/getDoctorInfo',authMiddleware,getDoctorInfoController)

// Post Update Profile
router.post('/updateprofile',authMiddleware,updateProfileController)

module.exports = router