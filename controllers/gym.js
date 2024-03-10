const bcrypt = require("bcrypt")
const asyncHandler = require("express-async-handler")
const Gym = require("../models/Gym")
const utils = require("../utils/index")

module.exports.editProfile = asyncHandler(async (req, res, next) => {
    const { name, email, telephone, city, neighborhood, description, district } = req.body
    const gym = await Gym.findById({
        _id: req.user._id
    })
    gym.name = name
    gym.description = description
    gym.telephone = telephone
    gym.address.city = city
    gym.address.neighborhood = neighborhood
    gym.address.district = district
    gym.email = email
    await gym.save()
    return res.status(200).json({ success: true })
})

module.exports.photoUpload = asyncHandler(async (req, res, next) => {
    let photos = []
    req.files.forEach(photo => {
        photos.push(photo.path)
    });
    const updatedGym = await Gym.updateOne(
        { _id: req.user._id },
        { $push: { photos: { $each: photos } } }
    );
    return res.status(200).json({ success: true })
})

module.exports.changedPassword = asyncHandler(async (req, res, next) => {
    const userId = req.user._id
    const password = req.body.password
    const newPassword = req.body.newPassword
    await utils.changedPassword(Gym, userId, password, newPassword, res)
})

module.exports.ppChanged = asyncHandler(async (req, res, next) => {
    let photo
    if (req.file) {
        photo = req.file.filename
    }
    const user = await Gym.findOne({
        _id: req.user._id
    })
    user.photo = photo
    await user.save()
    return res.status(200).json({ success: true, message: "Photo upload succesesfully" })
})