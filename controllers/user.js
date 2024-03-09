const Gym = require("../models/Gym");
const User = require("../models/User");

const utils = require("../utils/index")


module.exports.getAllGyms = async (req, res) => {
  try {
    const gyms = await Gym.find().sort({ rating: -1 });
    res.status(200).json({ successfull: true, count: gyms.length, gyms })
  } catch (err) {
    res.status(500).json({ message: "Internal server error", err })
    console.error("Internal server error in getAllGyms")
  }
}

module.exports.getNearbyGyms = async (req, res) => {
  try {
    // const filters = [
    //   {
    //     $match: {
    //       "address.city": req.user.address.city
    //     }
    //   },
    //   {
    //     $addFields: {
    //       cityMatch: { $cond: { if: { $eq: ["$city", req.user.address.city] }, then: 1, else: 0 } }
    //     }
    //   },
    //   {
    //     $sort: { cityMatch: -1, rating: -1 }
    //   }
    // ];
    // if (req.query.rating) {
    //   if (req.query.rating == 1) {
    //     filters.push({
    //       $sort: { cityMatch: -1, rating: 1 }
    //     });
    //   } else {
    //     filters.push({
    //       $sort: { cityMatch: -1, rating: -1 }
    //     });
    //   }
    // }
    // const matchingGyms = await Gym.aggregate(filters)
    // res.status(200).json({ successfull: true, count: matchingGyms.length, matchingGyms })

    // const neighborhood = await Gym.find({
    //   "address.neighborhood": req.user.address.neighborhood
    // })
    // const district = await Gym.find({
    //   "address.district": req.user.address.district
    // })
    // const city = await Gym.find({
    //   "address.city": req.user.address.city
    // })
    // const gym = await Gym.find({
    //   "address.city": "Bursa",
    //   'address.district': "Nilufer",
    //   'address.neighborhood': "Odunluk"
    // }).sort({ distance: 1 });
    const nearestGyms = await Gym.find({
      'address.city': req.user.address.city,
      'address.district': req.user.address.district,
      'address.neighborhood': req.user.address.neighborhood
      
    }).sort({ distance: 1 });
    res.status(200).json({ successfull: true, count: nearestGyms.length, nearestGyms })
  } catch (err) {
    res.status(500).json({ message: "Internal server error", err })
    console.error("Internal server error in getAllGyms", err)
  }
}

module.exports.getGym = async (req, res) => {
  const gymId = req.params.id
  try {
    if (utils.isValidObjectId(gymId, res)) return
    const gym = await Gym.findOne({ _id: gymId })
    if (!gym) {
      return res.status(404).json({ success: false, message: "The result you are looking for could not be found." })
    }
    return res.status(200).json({ success: true, gym })
  }
  catch (err) {
    res.status(500).json({ message: "Internal server error", err })
    console.error("Internal server error in getGym", err)
  }
}

module.exports.setRating = async (req, res) => {
  const { rating, gymId } = req.body
  try {
    if (utils.isValidObjectId(gymId, res)) return
    const gym = await Gym.updateOne(
      { _id: gymId },
      { $push: { rating: rating } }
    )
    res.status(200).json({ success: true, rating: rating })
  }
  catch (err) {
    res.status(500).json({ message: "Internal server error", err })
    console.error("Internal server error in setRating", err)
  }
}