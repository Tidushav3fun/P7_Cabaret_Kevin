const { verifySignUp } = require('../middleware')
const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth.controller')

router.post(
  '/signup',
  [verifySignUp.checkDuplicateEmail, verifySignUp.checkRolesExisted],
  authController.signup
)
router.post('/signin', authController.signin)

module.exports = router
