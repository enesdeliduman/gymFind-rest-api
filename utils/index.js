const bcrypt = require("bcrypt")
const mongoose = require('mongoose')
const Gym = require("../models/Gym")


exports.isValidObjectId = (id, res) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: 'Object id is not valid' })
    }
}
exports.changedPassword = async (Model, Id, password, newPassword, res) => {
    try {
        const control = await Model.findById({
            _id: Id
        }).select("+password")
        const match = await bcrypt.compare(password, control.password)
        if (!match) {
            return res.status(400).json({ success: false, message: "You entered your current password incorrectly."})
        }
        control.password = newPassword
        await control.save()
        return res.status(200).json({ success: true, message: "Password successfully changed."})
    }
    catch (err) {
        if (err.name == "ValidationError") {
            const errorMessages = {}
            for (let x in err.errors) {
                errorMessages[x] = err.errors[x].message
            }
            res.status(400).json({ success: false, message: errorMessages })
        } else {
            res.status(500).json({ message: "Internal server error", err })
            console.error("Internal server error in changedPasswordUtils", err)
        }
    }
}