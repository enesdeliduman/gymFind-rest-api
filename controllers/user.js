const asyncHandler = require("express-async-handler")
const Gym = require("../models/Gym");
const User = require("../models/User");

const utils = require("../utils/index")


module.exports.getAllGyms = asyncHandler(async (req, res, next) => {
  const gyms = await Gym.find({ isSuspend: false }).sort({ rating: -1 });
  res.status(200).json({ successfull: true, count: gyms.length, gyms })
})

module.exports.getNearbyGyms = asyncHandler(async (req, res, next) => {
  const nearestGyms = await Gym.find({
    'address.city': req.user.address.city,
    isSuspend: false
  }).sort({ distance: 1 });
  res.status(200).json({ successfull: true, count: nearestGyms.length, nearestGyms })
})

module.exports.getGym = asyncHandler(async (req, res, next) => {
  const gymId = req.params.id
  if (utils.isValidObjectId(gymId, res)) return
  const gym = await Gym.findOne({ _id: gymId })
  if (!gym || gym.isSuspend) {
    return res.status(404).json({ success: false, message: "The result you are looking for could not be found." })
  }
  return res.status(200).json({ success: true, gym })
})

module.exports.setRating = asyncHandler(async (req, res, next) => {
  const { rating } = req.body
  if (utils.isValidObjectId(gymId, res)) return
  const gym = await Gym.updateOne(
    { _id: gymId },
    { $push: { rating: rating } }
  )
  res.status(200).json({ success: true, rating: rating })
})

module.exports.editProfile = asyncHandler(async (req, res, next) => {
  const { name, surname, email, city, neighborhood, district, telephone } = req.body
  const user = await User.findOne({ _id: req.user._id })
  user.name = name;
  user.surname = surname;
  user.email = email;
  user.telephone = telephone;
  user.address.city = city;
  user.address.neighborhood = neighborhood;
  user.address.district = district;
  await user.save()
  res.status(200).json({ success: true })
})

module.exports.changedPassword = asyncHandler(async (req, res, next) => {
  const userId = req.user._id
  const password = req.body.password
  const newPassword = req.body.newPassword
  await utils.changedPassword(User, userId, password, newPassword, res)
})

module.exports.ppChanged = asyncHandler(async (req, res, next) => {
  let photo
  if (req.file) {
    photo = req.file.filename
  }
  const user = await User.findOne({
    _id: req.user._id
  })
  user.photo = photo
  await user.save()
  return res.status(200).json({ success: true, message: "Photo upload succesesfully" })
})