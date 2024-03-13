const asyncHandler = require('express-async-handler')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")

const Gym = require("../models/Gym")
const User = require("../models/User")

const utils = require("../utils/index")

const slugField = require('../helpers/slugify')
const sendMail = require("../helpers/send-mail")
const { mailTemp } = require("../public/html/mailTemplate")


module.exports.userRegister = asyncHandler(async (req, res, next) => {
    const { name, email, password, surname, telephone, city, neighborhood, district } = req.body
    let photo
    if (req.file) {
        photo = req.file.filename
    }
    const gym = await Gym.findOne({
        email
    })
    if (gym) {
        return res.status(400).json({ success: false, message: "This email address is already registered" })
    }
    let token = crypto.randomBytes(32).toString("hex");
    const user = await User.create({
        name,
        surname,
        password,
        photo,
        telephone,
        email,
        confirmToken: token,
        "address.city": city,
        "address.neighborhood": neighborhood,
        "address.district": district
    })
    const mailContent = mailTemp(name, token, "Welcome aboard! To fully utilize our platform, you need to verify your account. You can verify your account by clicking on the link we've sent you.",
        "Click on the text.");
    await sendMail.sendMail({
        to: email,
        subject: `Confirm Account | Message from ${process.env.SITE_NAME}`,
        html: mailContent
    })
    res.status(201).json({ success: true, user })
})

module.exports.gymRegister = asyncHandler(async (req, res, next) => {
    const { name, email, password, address, telephone, city, neighborhood, district } = req.body
    let photo
    if (req.file) {
        photo = req.file.filename
    }
    const user = await User.findOne({
        email
    })
    if (user) {
        return res.status(400).json({ success: false, message: "This email address is already registered" })
    }
    let token = crypto.randomBytes(32).toString("hex");
    const gym = await Gym.create({
        name,
        password,
        email,
        address,
        telephone,
        photo: photo,
        slug: slugField(name),
        confirmToken: token,
        "address.city": city,
        "address.neighborhood": neighborhood,
        "address.district": district
    })
    const mailContent = mailTemp(name, token, "Welcome aboard! To fully utilize our platform, you need to verify your account. You can verify your account by clicking on the link we've sent you.",
        "Click on the text.");
    await sendMail.sendMail({
        to: email,
        subject: `Confirm Account | Message from ${process.env.SITE_NAME}`,
        html: mailContent
    })
    res.status(201).json({ success: true, gym })
})

module.exports.login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body
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
    if (user.isSuspend) {
        return res.status(400).json({ success: false, message: "Account has been suspended" })
    }
    const match = await bcrypt.compare(password, user.password)
    if (!match) {
        return res.status(400).json({ success: false, message: "The entered password is incorrect" })
    }
    const token = jwt.sign({
        _id: user._id,
        name: user.name || user.name,
        address: {
            city: user.address.city,
            district: user.address.district,
            neighborhood: user.address.neighborhood
        },
        isAdmin: user.isAdmin,
        isConfirm: user.isConfirm
    }, process.env.JWT_SECRET_KEY)
    return res.header("x-auth-token", token).status(200).json({ success: true, message: "True password", token })
})

module.exports.forgotPassword = asyncHandler(async (req, res, next) => {
    const { email } = req.body
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
    let token = crypto.randomBytes(32).toString("hex");
    user.resetPassword.token = token
    user.resetPassword.expired = Date.now() + (3 * 60 * 60 * 1000) + (60 * 1000 * 5);
    await user.save()

    const mailContent = mailTemp(user.name, token, "We've heard you've forgotten your password. We're sorry about that. The link we sent you to reset your password will expire in 5 minutes.", "You can reset your password by clicking on the link provided in the text.");
    await sendMail.sendMail({
        to: user.email,
        subject: `Reset Password | Message from ${process.env.SITE_NAME}`,
        html: mailContent
    })
    return res.status(200).json({ success: true, message: "The link was sent successfully", token })
})

module.exports.newPassword = asyncHandler(async (req, res, next) => {
    const token = req.params.token
    const { password } = req.body

    let user = await User.findOne({
        "resetPassword.token": token
    })
    if (!user) {
        let gym = await Gym.findOne({
            "resetPassword.token": token
        })
        if (!gym) {
            return res.status(404).json({ success: false, message: "No such user found" })
        }
        user = gym
    }
    if (Date.now() + (3 * 60 * 60 * 1000) >= user.resetPassword.expired) {
        return res.status(400).json({ success: false, message: "The link provided is no longer valid." })
    }
    user.password = password
    user.resetPassword.token = null
    user.resetPassword.expired = null
    await user.save()
    return res.status(200).json({ success: true, message: "Changed Password" })
})

module.exports.newConfirmToken = asyncHandler(async (req, res, next) => {
    const email = req.headers.email
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
    let token = crypto.randomBytes(32).toString("hex");
    const mailContent = mailTemp(user.name, token, "To fully utilize our platform, you need to verify your account. You can verify your account by clicking on the link we've sent you.",
        "Click on the text.");
    await sendMail.sendMail({
        to: email,
        subject: `Confirm Account | Message from ${process.env.SITE_NAME}`,
        html: mailContent
    })
    user.confirmToken = token
    await user.save()
    return res.status(200).json({ success: true, message: "The link was sent successfully" })
})

module.exports.confirmAccount = asyncHandler(async (req, res, next) => {
    const token = req.params.token
    let user = await User.findOne({
        confirmToken: token
    })
    if (!user) {
        let gym = await Gym.findOne({
            confirmToken: token
        })
        if (!gym) {
            return res.status(404).json({ success: false, message: "Token is invalid or has expired." })
        }
        user = gym
    }
    user.isConfirm = true
    user.confirmToken = null
    await user.save()
    return res.status(200).json({ success: true, message: "Succesfully confirmed account" })
})