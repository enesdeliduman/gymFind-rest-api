const express = require("express")
const router = express.Router()

const authRouter = require("./auth")
const gymRouter = require("./gym")
const userRouter = require("./user")

router.use("/user", userRouter)
router.use("/gym", gymRouter)
router.use("/auth", authRouter)

module.exports = router