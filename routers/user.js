const express = require("express")
const router = express.Router()

const userController = require("../controllers/user.js")
const isAuth = require("../middlewares/isAuth.js")
const isConfirm = require("../middlewares/isConfirm.js")

router.get("/getAllGyms", userController.getAllGyms)
router.get("/getNearbyGyms", [isAuth], userController.getNearbyGyms)
router.get("/getGym/:id/:slug", userController.getGym)

router.post("/setRating", [isAuth], userController.setRating)

module.exports = router