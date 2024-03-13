const express = require("express")
const router = express.Router()

const userController = require("../controllers/user.js")
const isAuth = require("../middlewares/isAuth.js")
const isConfirm = require("../middlewares/isConfirm.js")

const imageUpload = require("../helpers/imageUpload.js")

router.get("/getAllGyms", userController.getAllGyms)
router.get("/getNearbyGyms", [isAuth], userController.getNearbyGyms)
router.get("/getGym/:id/:slug", userController.getGym)

router.post("/setRating", [isAuth, isConfirm], userController.setRating)

router.put("/editProfile", [isAuth], userController.editProfile)
router.put("/changedPassword", [isAuth], userController.changedPassword)
router.put("/ppChanged", [isAuth], imageUpload.upload.single('photo'), userController.ppChanged)

module.exports = router