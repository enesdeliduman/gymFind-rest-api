const express = require("express")
const router = express.Router()

const userController = require("../controllers/user.js")
const isAuth = require("../middlewares/isAuth.js")
const isConfirm = require("../middlewares/isConfirm.js")

const imageUpload = require("../helpers/imageUpload.js")

router.get("/getAllGyms", userController.getAllGyms)
router.get("/getNearbyGyms", [isAuth], userController.getNearbyGyms)
router.get("/getGym/:id/:slug", userController.getGym)

router.post("/setRating", [isAuth], userController.setRating)

router.put("/editProfile", [isAuth, isConfirm], userController.editProfile)
router.put("/changedPassword", [isAuth, isConfirm], userController.changedPassword)
router.put("/ppChanged", [isAuth, isConfirm], imageUpload.upload.single('photo'), userController.ppChanged)


module.exports = router