const bcrypt = require("bcrypt")
const mongoose = require('mongoose')
const Gym = require("../models/Gym")
const User = require("../models/User")

const asyncHandler = require("express-async-handler")

exports.isValidObjectId = (id, res) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: 'Object id is not valid' })
    }
}

exports.changedPassword = asyncHandler(async (Model, Id, password, newPassword, res, next) => {
    const control = await Model.findById({
        _id: Id
    }).select("+password")
    if (!control) {
        return res.status(404).json({ success: false, message: "No such user found" })
    }
    const match = await bcrypt.compare(password, control.password)
    if (!match) {
        return res.status(400).json({ success: false, message: "You entered your current password incorrectly." })
    }
    control.password = newPassword
    await control.save()
    return res.status(200).json({ success: true, message: "Password successfully changed." })
})
exports.findUserWithEmail = asyncHandler(async (email, res) => {
    let user = await User.findOne({
        email
    }).select('+password')
    if (!user) {
        let gym = await Gym.findOne({
            email
        }).select('+password')
        if (!gym) {
            return res.status(400).json({ success: false, message: "No such user found" })
        }
        user = gym
    }
    return user
})