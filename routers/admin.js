const express = require("express")
const router = express.Router()

const adminController = require("../controllers/admin.js")
const isAuth = require("../middlewares/isAuth.js")
const isAdmin = require("../middlewares/isAdmin.js")


// Gym
router.get("/getGyms", [isAuth, isAdmin], adminController.getGyms)
router.get("/getGym/:id", [isAuth, isAdmin], adminController.getGym)
router.put("/suspendGym/:id", [isAuth, isAdmin], adminController.suspendGym)
router.put("/unsuspendGym/:id", [isAuth, isAdmin], adminController.unsuspendGym)
router.delete("/deleteGym/:id", [isAuth, isAdmin], adminController.deleteGym)

// User
router.get("/getUsers", [isAuth, isAdmin], adminController.getUsers)
router.get("/getUser/:id", [isAuth, isAdmin], adminController.getUser)
router.delete("/deleteUser/:id", [isAuth, isAdmin], adminController.deleteUser)


module.exports = router