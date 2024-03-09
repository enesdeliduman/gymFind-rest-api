const mongoose = require('mongoose')
const Gym = require("../models/Gym")


exports.isValidObjectId = (id, res) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: 'Object id is not valid' })
    }
}

