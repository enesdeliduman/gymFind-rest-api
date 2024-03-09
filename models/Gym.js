const mongoose = require('mongoose');
const { Schema } = mongoose;

const bcrypt = require("bcrypt")
const GymSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"],
        trim: true
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
        minLength: [4, "Please provide a password with min length 4"],
        select: false
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please provide a valid email"
        ]
    },
    description: {
        type: String,
        maxLength:[300,"the size of the description should be no more than 100 characters"]
    },
    telephone: {
        type: String
    },
    photo: {
        type: String,
        default: "public/default.jpeg"
    },
    address: {
        city: {
            type: String
        },
        district: {
            type: String
        },
        neighborhood: {
            type: String
        },
    },
    photos: [{
        type: String,
        max: 2
    }],
    rating: {
        type: [Number],
        default: [5, 4, 1]
    },
    slug: {
        type: String
    },
    role: {
        type: String,
        default: "gym",
        immutable: true
    },
    isConfirm: {
        type: Boolean,
        default: false
    },
    confirmToken: {
        type: String,
        default: null
    },
    resetPassword: {
        token: {
            type: String,
            default: null
        },
        expired: {
            type: Date,
            default: null
        }
    }
},
    { timestamps: true });

GymSchema.pre('save', async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword
    next()
});

const Gym = mongoose.model("Gym", GymSchema);
module.exports = Gym