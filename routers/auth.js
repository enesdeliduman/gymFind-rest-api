const express = require("express")
const router = express.Router()

const imageUpload = require("../helpers/imageUpload.js")
const csrf = require("../middlewares/csrf")

const authController = require("../controllers/auth.js")

// Register
router.post("/user/register", authController.userRegister)
router.post("/gym/register", imageUpload.upload.single('photo'), authController.gymRegister)

// Login
router.post("/login", authController.login)

// Reset Password
router.post("/forgotPassword", authController.forgotPassword)
router.post("/newPassword/:token", authController.newPassword)

// Confirm Account
router.post("/newConfirmToken/", authController.newConfirmToken)
router.post("/confirmAccount/:token", authController.confirmAccount)


module.exports = router