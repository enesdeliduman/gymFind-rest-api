const asyncHandler = require("express-async-handler")
const utils = require("../utils/index")
const Gym = require("../models/Gym")
const User = require("../models/User")


// Gym
module.exports.getGyms = asyncHandler(async (req, res, next) => {
    const gyms = await Gym.find().select("name photo address isConfirm suspend rating")
    res.status(200).json({ success: true, gyms })
})

module.exports.getGym = asyncHandler(async (req, res, next) => {
    const id = req.params.id
    if (utils.isValidObjectId(id, res)) return
    const gym = await Gym.findById(id).select("name photo photos email telephone address isConfirm suspend rating")
    if (!gym) {
        return res.status(404).json({ success: false, message: "Gym not found." })
    }
    res.status(200).json({ success: true, gym })
})

module.exports.suspendGym = asyncHandler(async (req, res, next) => {
    const id = req.params.id
    if (utils.isValidObjectId(id, res)) return
    const gym = await Gym.findById(id)
    if (!gym) {
        return res.status(404).json({ success: false, message: "Gym not found." })
    }
    gym.isSuspend = true
    await gym.save()
    res.status(200).json({ success: true, message: "Account has been suspended." })
})

module.exports.unsuspendGym = asyncHandler(async (req, res, next) => {
    const id = req.params.id
    if (utils.isValidObjectId(id, res)) return
    const gym = await Gym.findById(id)
    if (!gym) {
        return res.status(404).json({ success: false, message: "Gym not found." })
    }
    gym.isSuspend = false
    await gym.save()
    res.status(200).json({ success: true, message: "Rescued from the suspend." })
})

module.exports.deleteGym = asyncHandler(async (req, res, next) => {
    const id = req.params.id
    if (utils.isValidObjectId(id, res)) return
    const gym = await Gym.findByIdAndDelete(id)
    if (!gym) {
        return res.status(404).json({ success: false, message: "Gym not found." })
    }
    res.status(200).json({ success: true, message: "Account successfully deleted." })
})

// User
module.exports.getUsers = asyncHandler(async (req, res, next) => {
    const users = await User.find().select("name surname photo address isConfirm isAdmin")
    res.status(200).json({ success: true, users })
})

module.exports.getUser = asyncHandler(async (req, res, next) => {
    const id = req.params.id
    const user = await User.findById(id).select("name photo email telephone address isConfirm suspend rating")
    if (utils.isValidObjectId(id, res)) return
    if (!user) {
        return res.status(404).json({ success: false, message: "User not found." })
    }
    res.status(200).json({ success: true, user })
})

module.exports.deleteUser = asyncHandler(async (req, res, next) => {
    const id = req.params.id
    if (utils.isValidObjectId(id, res)) return
    const user = await Gym.findByIdAndDelete(id)
    if(!user){
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." })
        }
    }
    res.status(200).json({ success: true, message: "Account successfully deleted." })
})