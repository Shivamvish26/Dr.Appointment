const express = require('express')
const authMiddleware = require('../middleware/authMiddleware')
const { getDoctorInfoController,updateProfileController, getDoctorbyidController } = require('../Controllers/doctorsCtrl')
const router = express.Router()

// Post SINGLE INFO
router.post('/getDoctorInfo',authMiddleware,getDoctorInfoController)

// Post Update Profile
router.post('/updateprofile',authMiddleware,updateProfileController)

// POST GET SINGLE DOC
router.post('/getDoctorByID',authMiddleware,getDoctorbyidController)


module.exports = router