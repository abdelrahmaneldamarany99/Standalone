const express = require('express')

// controller functions
const { signinUser, signupUser } = require('../controllers/userController')

const router = express.Router()

// signin route
router.post('/signin', signinUser)

// signup route
router.post('/signup', signupUser)

module.exports = router