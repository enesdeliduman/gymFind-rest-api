const Gym = require("../models/Gym")

const utils = require("../utils/index")

module.exports.editProfile = async (req, res) => {
    try {
        const { name, email, telephone, city, neighborhood, description, district } = req.body
        const gym = await Gym.findById({
            _id: req.user._id
        })
        name ? gym.name = name : gym.name;
        description ? gym.description = description : gym.description;
        telephone ? gym.telephone = telephone : gym.telephone;
        city ? gym.address.city = city : gym.address.city;
        neighborhood ? gym.address.neighborhood = neighborhood : gym.address.neighborhood;
        district ? gym.address.district = district : gym.address.district;
        email.length ? gym.email = email : gym.email;
        await gym.save()
        return res.status(200).json({ success: true })
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
            console.error("Internal server error in editProfile", err)
        }
    }
}
module.exports.photoUpload = async (req, res) => {
    try {
        let photos = []
        req.files.forEach(photo => {
            photos.push(photo.path)
        });
        const updatedGym = await Gym.updateOne(
            { _id: req.user._id },
            { $push: { photos: { $each: photos } } }
        );
        return res.status(200).json({ success: true })
    }
    catch (err) {
        res.status(500).json({ message: "Internal server error", err })
        console.error("Internal server error in editProfile", err)
    }
}
