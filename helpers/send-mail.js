"use strict";
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user:"<YOUR EMAIL USERNMAE>",
        pass:"<YOUR EMAIL PASSWORD>",
    },
});
module.exports = transporter;