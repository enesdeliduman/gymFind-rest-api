"use strict";
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user:"<your email username>",
        pass:"<your email password>",
    },
});
module.exports = transporter;
