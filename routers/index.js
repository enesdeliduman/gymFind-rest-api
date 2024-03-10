const express = require("express")
const router = express.Router()

const authRouter = require("./auth")
const gymRouter = require("./gym")
const userRouter = require("./user")
const adminRouter = require("./admin")

router.use("/user", userRouter)
router.use("/gym", gymRouter)
router.use("/auth", authRouter)
router.use("/admin", adminRouter)

module.exports = router